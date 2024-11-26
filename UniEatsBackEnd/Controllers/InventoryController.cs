using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using UniEatsBackEnd.DTO;
using UniEatsBackEnd.GenericResponse;

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly string? _conn;

        public InventoryController(IConfiguration configuration)
        {
            _conn = configuration.GetConnectionString("DefaultConnection");
        }

        // UC-22: Update Stock
        [HttpPost("update-stock/{itemId}")]
        public GenericResponse<string> UpdateStock(int itemId, [FromBody] int quantityToAdd)
        {
            try
            {
                string query = @"
                    UPDATE [UniEats].[dbo].[Inventory]
                    SET [stock_added] = @stock_added,
                        [current_stock] = [current_stock] + @stock_added,
                        [updated_at] = GETDATE()
                    WHERE [item_id] = @item_id;";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@item_id", itemId);
                        command.Parameters.AddWithValue("@stock_added", quantityToAdd);

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected == 0)
                        {
                            return new GenericResponse<string> { Success = false, Msg = "Item not found." };
                        }

                        return new GenericResponse<string> { Success = true, Msg = "Stock updated successfully." };
                    }
                }
            }
            catch (Exception ex)
            {
                return new GenericResponse<string> { Success = false, Msg = ex.Message };
            }
        }

        // UC-23: Add Food Item
        [HttpPost("add-item")]
        public GenericResponse<string> AddFoodItem([FromBody] FoodItemDTO foodItem)
        {
            try
            {
                string query = @"
                    INSERT INTO [UniEats].[dbo].[Inventory] 
                    ([item_id], [stock_added], [stock_removed], [current_stock], [updated_at], [restock_date])
                    VALUES 
                    (@item_id, @stock_added, 0, @current_stock, GETDATE(), @restock_date);";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@item_id", foodItem.ItemId);
                        command.Parameters.AddWithValue("@stock_added", foodItem.StockAdded);
                        command.Parameters.AddWithValue("@current_stock", foodItem.StockAdded);
                        command.Parameters.AddWithValue("@restock_date", foodItem.RestockDate);

                        command.ExecuteNonQuery();

                        return new GenericResponse<string> { Success = true, Msg = "Food item added successfully." };
                    }
                }
            }
            catch (Exception ex)
            {
                return new GenericResponse<string> { Success = false, Msg = ex.Message };
            }
        }

        // UC-24: Remove Food Item
        [HttpDelete("remove-item/{itemId}")]
        public GenericResponse<string> RemoveFoodItem(int itemId)
        {
            try
            {
                string query = @"
                    DELETE FROM [UniEats].[dbo].[Inventory]
                    WHERE [item_id] = @item_id;";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@item_id", itemId);

                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected == 0)
                        {
                            return new GenericResponse<string> { Success = false, Msg = "Item not found." };
                        }

                        return new GenericResponse<string> { Success = true, Msg = "Food item removed successfully." };
                    }
                }
            }
            catch (Exception ex)
            {
                return new GenericResponse<string> { Success = false, Msg = ex.Message };
            }
        }
    }
}
