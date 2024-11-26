using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UniEatsBackEnd.DTO;
using UniEatsBackEnd.GenericResponse;

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly string? _conn;

        public PaymentController(IConfiguration configuration)
        {
            _conn = configuration.GetConnectionString("DefaultConnection");
        }

        // UC-14: General Payment Endpoint (process payment)
        [HttpPost("pay")]
        public GenericResponse<string> MakePayment([FromBody] PaymentDTO payment)
        {
            try
            {
                // Insert payment record into the database
                string query = @"
                    INSERT INTO [UniEats].[dbo].[Payments] 
                    ([order_id], [amount], [payment_method], [payment_status], [transaction_id], [payment_date], [refund_amount])
                    VALUES 
                    (@order_id, @amount, @payment_method, @payment_status, @transaction_id, @payment_date, @refund_amount);";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@order_id", payment.OrderId);
                        command.Parameters.AddWithValue("@amount", payment.Amount);
                        command.Parameters.AddWithValue("@payment_method", payment.PaymentMethod);
                        command.Parameters.AddWithValue("@payment_status", "Confirmed"); // Default status
                        command.Parameters.AddWithValue("@transaction_id", payment.TransactionId);
                        command.Parameters.AddWithValue("@payment_date", DateTime.Now);
                        command.Parameters.AddWithValue("@refund_amount", 0); // Initially no refund

                        command.ExecuteNonQuery();
                    }
                }

                return new GenericResponse<string> { Success = true, Msg = "Payment processed successfully." };
            }
            catch (Exception ex)
            {
                return new GenericResponse<string> { Success = false, Msg = ex.Message };
            }
        }

        // UC-15: View Payment History for an Order
        [HttpGet("history/{orderId}")]
        public GenericResponse<List<PaymentDTO>> GetPaymentHistory(int orderId)
        {
            try
            {
                List<PaymentDTO> payments = new List<PaymentDTO>();

                string query = @"
                    SELECT [payment_id], [amount], [payment_method], [payment_status], [payment_date]
                    FROM [UniEats].[dbo].[Payments]
                    WHERE [order_id] = @order_id;";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@order_id", orderId);

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var payment = new PaymentDTO
                                {
                                    PaymentId = reader.GetInt32(reader.GetOrdinal("payment_id")),
                                    Amount = reader.GetDecimal(reader.GetOrdinal("amount")),
                                    PaymentMethod = reader.GetString(reader.GetOrdinal("payment_method")),
                                    PaymentStatus = reader.GetString(reader.GetOrdinal("payment_status")),
                                    PaymentDate = reader.GetDateTime(reader.GetOrdinal("payment_date"))
                                };
                                payments.Add(payment);
                            }
                        }
                    }
                }

                return new GenericResponse<List<PaymentDTO>> { Success = true, data = payments };
            }
            catch (Exception ex)
            {
                return new GenericResponse<List<PaymentDTO>> { Success = false, Msg = ex.Message };
            }
        }

        // UC-16: Process Refund
        [HttpPost("refund/{paymentId}")]
        public GenericResponse<string> ProcessRefund(int paymentId, [FromBody] decimal refundAmount)
        {
            try
            {
                // Update the refund amount for the given payment_id
                string query = @"
                    UPDATE [UniEats].[dbo].[Payments]
                    SET [refund_amount] = @refund_amount
                    WHERE [payment_id] = @payment_id;";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@payment_id", paymentId);
                        command.Parameters.AddWithValue("@refund_amount", refundAmount);

                        command.ExecuteNonQuery();
                    }
                }

                return new GenericResponse<string> { Success = true, Msg = "Refund processed successfully." };
            }
            catch (Exception ex)
            {
                return new GenericResponse<string> { Success = false, Msg = ex.Message };
            }
        }
    }
}

// UC-14: Payment
// UC-15: Pay by Card
// UC-16: Validate Payment
// UC-17: Pay by Cash

// ________________________

// Wallet or Loyalty Points

// Introduce a wallet or point-based reward system for frequent users.
// Use Case: Add RewardPoints logic in the UserController and integrate with PaymentController.
// Split Payment

// Allow users to split the bill and pay separately in groups.
// Use Case: Add a SplitPayment method in PaymentController.