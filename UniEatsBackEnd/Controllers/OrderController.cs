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
    public class OrderController : ControllerBase
    {
        private readonly string? _conn;

        public OrderController(IConfiguration configuration)
        {
            _conn = configuration.GetConnectionString("DefaultConnection");
        }

        // UC-18: Create an Order
        [HttpPost("create")]
        public GenericResponse<string> CreateOrder([FromBody] OrderDTO order)
        {
            try
            {
                string query = @"
                    INSERT INTO [UniEats].[dbo].[Orders] 
                    ([user_id], [order_date], [total_amount], [status], [payment_method], [delivery_method], [table_number], [order_notes])
                    VALUES
                    (@user_id, @order_date, @total_amount, @status, @payment_method, @delivery_method, @table_number, @order_notes);";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@user_id", order.UserId);
                        command.Parameters.AddWithValue("@order_date", DateTime.Now); // Default to current time
                        command.Parameters.AddWithValue("@total_amount", order.TotalAmount);
                        command.Parameters.AddWithValue("@status", "Pending");  // Default to 'Pending'
                        command.Parameters.AddWithValue("@payment_method", order.PaymentMethod);
                        command.Parameters.AddWithValue("@delivery_method", order.DeliveryMethod);
                        command.Parameters.AddWithValue("@table_number", order.TableNumber);
                        command.Parameters.AddWithValue("@order_notes", order.OrderNotes);

                        command.ExecuteNonQuery();
                    }
                }

                return new GenericResponse<string> { Success = true, Msg = "Order created successfully." };
            }
            catch (Exception ex)
            {
                return new GenericResponse<string> { Success = false, Msg = ex.Message };
            }
        }

        // UC-20: Get Orders by User ID
        [HttpGet("get/{userId}")]
        public GenericResponse<List<OrderDTO>> GetOrdersByUser(int userId)
        {
            try
            {
                List<OrderDTO> orders = new List<OrderDTO>();

                string query = @"
                    SELECT [order_id], [user_id], [order_date], [total_amount], [status], [payment_method], [delivery_method], [table_number], [order_notes]
                    FROM [UniEats].[dbo].[Orders]
                    WHERE [user_id] = @user_id;";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@user_id", userId);

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var order = new OrderDTO
                                {
                                    OrderId = reader.GetInt32(reader.GetOrdinal("order_id")),
                                    UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                                    OrderDate = reader.GetDateTime(reader.GetOrdinal("order_date")),
                                    TotalAmount = reader.GetDecimal(reader.GetOrdinal("total_amount")),
                                    Status = reader.GetString(reader.GetOrdinal("status")),
                                    PaymentMethod = reader.GetString(reader.GetOrdinal("payment_method")),
                                    DeliveryMethod = reader.GetString(reader.GetOrdinal("delivery_method")),
                                    TableNumber = reader.GetInt32(reader.GetOrdinal("table_number")),
                                    OrderNotes = reader.GetString(reader.GetOrdinal("order_notes"))
                                };
                                orders.Add(order);
                            }
                        }
                    }
                }

                return new GenericResponse<List<OrderDTO>> { Success = true, data = orders };
            }
            catch (Exception ex)
            {
                return new GenericResponse<List<OrderDTO>> { Success = false, Msg = ex.Message };
            }
        }

        // Update Order Status or Other Details
        [HttpPut("update/{orderId}")]
        public GenericResponse<string> UpdateOrder(int orderId, [FromBody] OrderDTO order)
        {
            try
            {
                string query = @"
                    UPDATE [UniEats].[dbo].[Orders]
                    SET [status] = @status, 
                        [total_amount] = @total_amount, 
                        [payment_method] = @payment_method, 
                        [delivery_method] = @delivery_method, 
                        [table_number] = @table_number, 
                        [order_notes] = @order_notes
                    WHERE [order_id] = @order_id;";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@order_id", orderId);
                        command.Parameters.AddWithValue("@status", order.Status);
                        command.Parameters.AddWithValue("@total_amount", order.TotalAmount);
                        command.Parameters.AddWithValue("@payment_method", order.PaymentMethod);
                        command.Parameters.AddWithValue("@delivery_method", order.DeliveryMethod);
                        command.Parameters.AddWithValue("@table_number", order.TableNumber);
                        command.Parameters.AddWithValue("@order_notes", order.OrderNotes);

                        command.ExecuteNonQuery();
                    }
                }

                return new GenericResponse<string> { Success = true, Msg = "Order updated successfully." };
            }
            catch (Exception ex)
            {
                return new GenericResponse<string> { Success = false, Msg = ex.Message };
            }
        }

        // Delete Order (Mark as Cancelled or Delete)
        [HttpDelete("delete/{orderId}")]
        public GenericResponse<string> DeleteOrder(int orderId)
        {
            try
            {
                string query = "UPDATE [UniEats].[dbo].[Orders] SET [status] = 'Cancelled' WHERE [order_id] = @order_id;";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@order_id", orderId);
                        command.ExecuteNonQuery();
                    }
                }

                return new GenericResponse<string> { Success = true, Msg = "Order cancelled successfully." };
            }
            catch (Exception ex)
            {
                return new GenericResponse<string> { Success = false, Msg = ex.Message };
            }
        }
    }
}

// UC-18: Reduce Stock
// UC-20: Pickup