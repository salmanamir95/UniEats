using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using UniEatsBackEnd.GenericResponse;
using UniEatsBackEnd.DTO;

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodAndMenuController : ControllerBase
    {
        private readonly string? _conn;

        public FoodAndMenuController(IConfiguration configuration)
        {
            _conn = configuration.GetConnectionString("DefaultConnection");
        }

        // UC-01: Recommend Food Based on Previous Orders or Reviews
        [HttpGet("recommend")]
        public async Task<GenericResponse<List<RealFoodItemDTO>>> RecommendFood(int userId)
        {
            try
            {
                List<RealFoodItemDTO> recommendedItems = new List<RealFoodItemDTO>();

                // Placeholder logic for recommendations (e.g., fetch items from the user's order history)
                string query = @"
                    SELECT f.[item_id], f.[name], f.[category], f.[price], f.[description], f.[image_url], f.[availability], 
                           f.[stock_quantity], f.[discount], f.[allergens], f.[dietary_tags]
                    FROM [UniEats].[dbo].[FoodItems] f
                    JOIN [UniEats].[dbo].[Orders] o ON o.[user_id] = @user_id
                    JOIN [UniEats].[dbo].[OrderDetails] od ON od.[order_id] = o.[order_id]
                    WHERE od.[item_id] = f.[item_id];";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@user_id", userId);

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            while (reader.Read())
                            {
                                var foodItem = new RealFoodItemDTO
                                {
                                    ItemId = reader.GetInt32(reader.GetOrdinal("item_id")),
                                    Name = reader.GetString(reader.GetOrdinal("name")),
                                    Category = reader.GetString(reader.GetOrdinal("category")),
                                    Price = reader.GetDecimal(reader.GetOrdinal("price")),
                                    Description = reader.GetString(reader.GetOrdinal("description")),
                                    ImageUrl = reader.GetString(reader.GetOrdinal("image_url")),
                                    Availability = reader.GetBoolean(reader.GetOrdinal("availability")),
                                    StockQuantity = reader.GetInt32(reader.GetOrdinal("stock_quantity")),
                                    Discount = reader.GetDecimal(reader.GetOrdinal("discount")),
                                    // Allergens = reader.GetString(reader.GetOrdinal("allergens")), // New field for allergens
                                    // DietaryTags = reader.GetString(reader.GetOrdinal("dietary_tags")).Split(',').ToList() // Split dietary tags by comma
                                };
                                recommendedItems.Add(foodItem);
                            }
                        }
                    }
                }

                return new GenericResponse<List<RealFoodItemDTO>> { Success = true, data = recommendedItems };
            }
            catch (Exception ex)
            {
                return new GenericResponse<List<RealFoodItemDTO>> { Success = false, Msg = ex.Message };
            }
        }

        // UC-02: Get Allergen and Dietary Info for a Food Item
        [HttpGet("food/{id}")]
        public async Task<GenericResponse<RealFoodItemDTO>> GetFoodItemInfo(int id)
        {
            try
            {
                RealFoodItemDTO foodItem = null;

                string query = @"
                    SELECT [item_id], [name], [category], [price], [description], [image_url], [availability], [stock_quantity], 
                           [discount], [allergens], [dietary_tags]
                    FROM [UniEats].[dbo].[FoodItems]
                    WHERE [item_id] = @id;";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.Read())
                            {
                                foodItem = new RealFoodItemDTO
                                {
                                    ItemId = reader.GetInt32(reader.GetOrdinal("item_id")),
                                    Name = reader.GetString(reader.GetOrdinal("name")),
                                    Category = reader.GetString(reader.GetOrdinal("category")),
                                    Price = reader.GetDecimal(reader.GetOrdinal("price")),
                                    Description = reader.GetString(reader.GetOrdinal("description")),
                                    ImageUrl = reader.GetString(reader.GetOrdinal("image_url")),
                                    Availability = reader.GetBoolean(reader.GetOrdinal("availability")),
                                    StockQuantity = reader.GetInt32(reader.GetOrdinal("stock_quantity")),
                                    Discount = reader.GetDecimal(reader.GetOrdinal("discount")),
                                    // Allergens = reader.GetString(reader.GetOrdinal("allergens")), // New field for allergens
                                    // DietaryTags = reader.GetString(reader.GetOrdinal("dietary_tags")).Split(',').ToList() // Split dietary tags
                                };
                            }
                        }
                    }
                }

                if (foodItem == null)
                {
                    return new GenericResponse<RealFoodItemDTO> { Success = false, Msg = "Food item not found." };
                }

                return new GenericResponse<RealFoodItemDTO> { Success = true, data = foodItem };
            }
            catch (Exception ex)
            {
                return new GenericResponse<RealFoodItemDTO> { Success = false, Msg = ex.Message };
            }
        }

        // UC-03: Real-Time Menu Updates by Staff/Owner
        [HttpPost("updateMenu")]
        public async Task<GenericResponse<string>> UpdateMenu([FromBody] List<RealFoodItemDTO> updatedFoodItems)
        {
            try
            {
                string query = @"
                    UPDATE [UniEats].[dbo].[FoodItems]
                    SET [name] = @name, [category] = @category, [price] = @price, [description] = @description, 
                        [image_url] = @image_url, [availability] = @availability, [stock_quantity] = @stock_quantity, 
                        [discount] = @discount,
                    WHERE [item_id] = @item_id;";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    foreach (var foodItem in updatedFoodItems)
                    {
                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            command.Parameters.AddWithValue("@item_id", foodItem.ItemId);
                            command.Parameters.AddWithValue("@name", foodItem.Name);
                            command.Parameters.AddWithValue("@category", foodItem.Category);
                            command.Parameters.AddWithValue("@price", foodItem.Price);
                            command.Parameters.AddWithValue("@description", foodItem.Description);
                            command.Parameters.AddWithValue("@image_url", foodItem.ImageUrl);
                            command.Parameters.AddWithValue("@availability", foodItem.Availability);
                            command.Parameters.AddWithValue("@stock_quantity", foodItem.StockQuantity);
                            command.Parameters.AddWithValue("@discount", foodItem.Discount);
                            // command.Parameters.AddWithValue("@allergens", foodItem.Allergens);
                            // command.Parameters.AddWithValue("@dietary_tags", string.Join(",", foodItem.DietaryTags));

                            await command.ExecuteNonQueryAsync();
                        }
                    }
                }

                return new GenericResponse<string> { Success = true, Msg = "Menu updated successfully." };
            }
            catch (Exception ex)
            {
                return new GenericResponse<string> { Success = false, Msg = ex.Message };
            }
        }

        // UC-04: Get All Food Items (Menu)
        [HttpGet("menu")]
        public async Task<GenericResponse<List<RealFoodItemDTO>>> GetMenu()
        {
            try
            {
                List<RealFoodItemDTO> foodItems = new List<RealFoodItemDTO>();

                string query = @"
            SELECT [item_id], [name], [category], [price], [description], [image_url], [availability], [stock_quantity], 
                   [discount]
            FROM [UniEats].[dbo].[FoodItems];";  // Query to fetch all food items

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            while (reader.Read())
                            {
                                var foodItem = new RealFoodItemDTO
                                {
                                    ItemId = reader.GetInt32(reader.GetOrdinal("item_id")),
                                    Name = reader.GetString(reader.GetOrdinal("name")),
                                    Category = reader.GetString(reader.GetOrdinal("category")),
                                    Price = reader.GetDecimal(reader.GetOrdinal("price")),
                                    Description = reader.GetString(reader.GetOrdinal("description")),
                                    ImageUrl = reader.GetString(reader.GetOrdinal("image_url")),
                                    Availability = reader.GetBoolean(reader.GetOrdinal("availability")),
                                    StockQuantity = reader.GetInt32(reader.GetOrdinal("stock_quantity")),
                                    Discount = reader.GetDecimal(reader.GetOrdinal("discount")),
                                    // Allergens = reader.GetString(reader.GetOrdinal("allergens")),
                                    // DietaryTags = reader.GetString(reader.GetOrdinal("dietary_tags")).Split(',').ToList()
                                };
                                foodItems.Add(foodItem);
                            }
                        }
                    }
                }

                return new GenericResponse<List<RealFoodItemDTO>> { Success = true, data = foodItems };
            }
            catch (Exception ex)
            {
                return new GenericResponse<List<RealFoodItemDTO>> { Success = false, Msg = ex.Message };
            }
        }

    }
}
