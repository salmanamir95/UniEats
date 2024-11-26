using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using UniEatsBackEnd.DTO;
using UniEatsBackEnd.GenericResponse;
using UniEatsBackEnd.Models;

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly string? _conn;
        private readonly IConfiguration _configuration;

        public ReservationController(IConfiguration configuration)
        {
            _configuration = configuration;
            _conn = _configuration.GetConnectionString("DefaultConnection");
        }

        [HttpGet("schedule/{userId}")]
        public GenericResponse<List<Reservation>> GetReservations(int userId)
        {


            List<Reservation> reservations = new List<Reservation>();

            try
            {
                string query = "SELECT [reservation_id], [user_id], [reservation_date], [number_of_people], [status], [table_number], [created_at] FROM [UniEats].[dbo].[Reservations] WHERE [user_id] = @userId";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@userId", userId);

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var reservation = new Reservation
                                {
                                    ReservationId = reader.GetInt32(reader.GetOrdinal("reservation_id")),
                                    UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                                    ReservationDate = reader.GetDateTime(reader.GetOrdinal("reservation_date")),
                                    NumberOfPeople = reader.GetInt32(reader.GetOrdinal("number_of_people")),
                                    Status = reader.GetString(reader.GetOrdinal("status")),
                                    TableNumber = reader.GetInt32(reader.GetOrdinal("table_number")),
                                    CreatedAt = reader.GetDateTime(reader.GetOrdinal("created_at"))
                                };
                                reservations.Add(reservation);
                            }
                        }
                    }
                }

                return new GenericResponse<List<Reservation>>
                {
                    Success = true,
                    data = reservations
                }; // Return reservations as JSON
            }
            catch (Exception ex)
            {
                return new GenericResponse<List<Reservation>>
                {
                    Success = false,
                    Msg = ex.Message
                };
            }
        }

        // UC-05: Make Reservation
        [HttpPost("makereservation")]
        public GenericResponse<Reservation> MakeReservation([FromBody] ReservationDTO reservation)
        {
            try
            {
                // Check if the table is available at the given time (also ensure a 15-minute gap between reservations)
                string checkAvailabilityQuery = @"
            SELECT COUNT(*)
            FROM [UniEats].[dbo].[Reservations]
            WHERE [table_number] = @table_number
            AND ABS(DATEDIFF(MINUTE, [reservation_date], @reservation_date)) < 15
            AND [status] = 'Confirmed'";  // Assuming 'Pending' status indicates an active reservation

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand checkCommand = new SqlCommand(checkAvailabilityQuery, connection))
                    {
                        // Pass the parameters for table_number and reservation_date
                        checkCommand.Parameters.AddWithValue("@table_number", reservation.TableNumber);
                        checkCommand.Parameters.AddWithValue("@reservation_date", reservation.ReservationDate);

                        // Check if the table is already reserved within the 15-minute window
                        int existingReservations = (int)checkCommand.ExecuteScalar();

                        if (existingReservations > 0)
                        {
                            return new GenericResponse<Reservation>
                            {
                                Msg = "Already Reserved.",
                                Success = false
                            };
                        }
                    }

                    // Proceed with the reservation if the table is available
                    string query = @"
                INSERT INTO [UniEats].[dbo].[Reservations] ([user_id], [reservation_date], [number_of_people], [status], [table_number], [created_at])
                VALUES (@user_id, @reservation_date, @number_of_people, @status, @table_number, @created_at);
                Select SCOPE_IDENTITY() FROM RESERVATIONS;
                ";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@user_id", reservation.UserId);
                        command.Parameters.AddWithValue("@reservation_date", reservation.ReservationDate);
                        command.Parameters.AddWithValue("@number_of_people", reservation.NumberOfPeople);
                        command.Parameters.AddWithValue("@status", "Confirmed");  // Default status
                        command.Parameters.AddWithValue("@table_number", reservation.TableNumber);
                        command.Parameters.AddWithValue("@created_at", DateTime.Now);

                        int new_ID = (int)command.ExecuteScalar();
                        Reservation reservation1 = new Reservation{
                            ReservationId= new_ID,
                            UserId= reservation.UserId,
                            ReservationDate= reservation.ReservationDate,
                            NumberOfPeople= reservation.NumberOfPeople,
                            Status= "Confirmed",
                            TableNumber= reservation.TableNumber,
                            CreatedAt= reservation.CreatedAt
                        };
                        return new GenericResponse<Reservation> { Msg = "Reservation made successfully!", Success = true, data= reservation1 };

                    }
                }
            }
            catch (Exception ex)
            {
                return new GenericResponse<Reservation> { Msg = ex.Message, Success = false };
            }
        }


        // UC-06: Check if Seat is Occupied
        [HttpGet("checkseat/{tableNumber}/{reservationDate}")]
        public GenericResponse<bool> CheckSeatOccupied(int tableNumber, DateTime reservationDate)
        {
            try
            {
                string query = @"
                    SELECT COUNT(*) 
                    FROM [UniEats].[dbo].[Reservations]
                    WHERE [table_number] = @table_number AND CAST([reservation_date] AS DATE) = @reservation_date AND [status] != 'Cancelled'";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@table_number", tableNumber);
                        command.Parameters.AddWithValue("@reservation_date", reservationDate);

                        int count = (int) command.ExecuteScalar();
                        if (count > 0)
                        {
                            return new GenericResponse<bool>{
                                Success=true,
                                data= true
                            };
                        }
                        else
                        {
                            return new GenericResponse<bool>{
                                Success= true,
                                data= false
                            };
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new GenericResponse<bool>{
                    Success= false,
                    Msg= ex.Message
                };
            }
        }

        // Cancel Reservation
        [HttpPost("cancelreservation/{reservationId}")]
        public async Task<IActionResult> CancelReservation(int reservationId)
        {
            try
            {
                string query = "UPDATE [UniEats].[dbo].[Reservations] SET [status] = 'Cancelled' WHERE [reservation_id] = @reservationId";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@reservationId", reservationId);

                        int rowsAffected = command.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            return Ok(new { message = "Reservation cancelled successfully!" });
                        }
                        else
                        {
                            return BadRequest("Reservation not found or already cancelled.");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // // Reservation Notifications (Email)
        // private async Task SendReservationNotificationEmail(string userEmail, DateTime reservationDate)
        // {
        //     try
        //     {
        //         var smtpClient = new SmtpClient("smtp.your-email-provider.com")
        //         {
        //             Port = 587,
        //             Credentials = new NetworkCredential("your-email@example.com", "your-email-password"),
        //             EnableSsl = true,
        //         };

        //         var mailMessage = new MailMessage
        //         {
        //             From = new MailAddress("no-reply@unieats.com"),
        //             Subject = "Upcoming Reservation Reminder",
        //             Body = $"Dear User, \n\nThis is a reminder for your upcoming reservation on {reservationDate:MMMM dd, yyyy hh:mm tt}.",
        //             IsBodyHtml = false,
        //         };
        //         mailMessage.To.Add(userEmail);

        //         await smtpClient.SendMailAsync(mailMessage);
        //     }
        //     catch (Exception ex)
        //     {
        //         // Log or handle the exception
        //         Console.WriteLine($"Error sending email: {ex.Message}");
        //     }
        // }
    }
}


// UC-04: View Reservation Schedule
// UC-05: Make Reservation
// UC-06: Check Seat Occupied
// UC-21: Delivery

// ___________________________

// Cancel Reservation

// Allow users to cancel a reservation they made.
// Use Case: Add a CancelReservation method in ReservationController.
// Reservation Notifications

// Notify users of upcoming reservations via email or in-app notifications.
// Use Case: Integrate notification systems into the ReservationController.