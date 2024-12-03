using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using UniEatsBackEnd.GenericResponse;
using UniEatsBackEnd.DTO; // Assuming you have a DTO class for FoodItem

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodItemController : ControllerBase
    {
        private readonly string? _conn;

        public FoodItemController(IConfiguration configuration)
        {
            _conn = configuration.GetConnectionString("DefaultConnection");
        }

        // UC-07: Search Food (by name or category)
        [HttpGet("search")]
        public async Task<GenericResponse<List<RealFoodItemDTO>>> SearchFood([FromQuery] string? name, [FromQuery] string? category)
        {
            try
            {
                List<RealFoodItemDTO> foodItems = new List<RealFoodItemDTO>();

                string query = @"
                    SELECT [item_id], [name], [category], [price], [description], [image_url], [availability], [stock_quantity], [discount]
                    FROM [UniEats].[dbo].[FoodItems]
                    WHERE (@name IS NULL OR [name] LIKE @name)
                    AND (@category IS NULL OR [category] LIKE @category);";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        // Use parameters to prevent SQL injection
                        command.Parameters.AddWithValue("@name", string.IsNullOrEmpty(name) ? (object)DBNull.Value : "%" + name + "%");
                        command.Parameters.AddWithValue("@category", string.IsNullOrEmpty(category) ? (object)DBNull.Value : "%" + category + "%");

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
                                    Discount = reader.GetDecimal(reader.GetOrdinal("discount"))
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

        //UC-08: Search by Name
        [HttpGet("search/name")]
        public async Task<GenericResponse<List<RealFoodItemDTO>>> SearchByName([FromQuery] string name)
        {
            return await SearchFood(name, null); // Use the same search logic
        }

        //UC-09: Search by Category

        [HttpGet("search/category")]
        public async Task<GenericResponse<List<RealFoodItemDTO>>> SearchByCategory([FromQuery] string category)
        {
            return await SearchFood(null, category); // Use the same search logic
        }

        // UC-10: View Food Item by ID
        [HttpGet("{id}")]
        public async Task<GenericResponse<RealFoodItemDTO>> ViewFoodItem(int id)
        {
            try
            {
                RealFoodItemDTO foodItem = null;

                string query = @"
                    SELECT [item_id], [name], [category], [price], [description], [image_url], [availability], [stock_quantity], [discount]
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
                                    Discount = reader.GetDecimal(reader.GetOrdinal("discount"))
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

        [HttpPost("add")]
        public GenericResponse<RealFoodItemDTO> AddFoodItem([FromBody] RealFoodItemDTO newFoodItem)
        {
            try
            {
                if (newFoodItem == null)
                {
                    return new GenericResponse<RealFoodItemDTO> { Success = false, Msg = "Invalid food item data." };
                }

                string query = @"
            INSERT INTO [UniEats].[dbo].[FoodItems] 
            ([name], [category], [price], [description], [image_url], [availability], [stock_quantity], [discount])
            VALUES (@name, @category, @price, @description, @image_url, @availability, @stock_quantity, @discount);
            SELECT CAST(SCOPE_IDENTITY() as int);"; // Retrieve the ID of the inserted item

                int newItemId;

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        // Use parameters to prevent SQL injection
                        command.Parameters.AddWithValue("@name", newFoodItem.Name ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@category", newFoodItem.Category ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@price", newFoodItem.Price);
                        command.Parameters.AddWithValue("@description", newFoodItem.Description ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@image_url", newFoodItem.ImageUrl ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@availability", newFoodItem.Availability);
                        command.Parameters.AddWithValue("@stock_quantity", newFoodItem.StockQuantity);
                        command.Parameters.AddWithValue("@discount", newFoodItem.Discount);

                        newItemId = (int)command.ExecuteScalar(); // Get the ID of the new item
                    }
                }

                // Return the created item with its ID
                newFoodItem.ItemId = newItemId;
                return new GenericResponse<RealFoodItemDTO> { Success = true, data = newFoodItem };
            }
            catch (Exception ex)
            {
                return new GenericResponse<RealFoodItemDTO> { Success = false, Msg = ex.Message };
            }
        }

    }
}
