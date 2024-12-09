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

        [HttpPost("Available_Seats")]
        public GenericResponse<List<int>> Available_Table([FromBody] int totalTables)
        {
            try
            {
                string query = @"
            SELECT DISTINCT [table_number]
            FROM [UniEats].[dbo].[Reservations]
            WHERE [status] = 'Confirmed'";

                List<int> reservedTables = new List<int>();

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                reservedTables.Add(reader.GetInt32(reader.GetOrdinal("table_number")));
                            }
                        }
                    }
                }

                List<int> availableTables = Enumerable.Range(1, totalTables)
                                                     .Where(table => !reservedTables.Contains(table))
                                                     .ToList();

                return new GenericResponse<List<int>>
                {
                    Success = true,
                    data = availableTables
                };
            }
            catch (Exception ex)
            {
                return new GenericResponse<List<int>>
                {
                    Success = false,
                    Msg = ex.Message
                };
            }
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
                // Check if the table is available at the given time (ensure a 15-minute gap between reservations)
                string checkAvailabilityQuery = @"
            SELECT COUNT(*)
            FROM [UniEats].[dbo].[Reservations]
            WHERE [table_number] = @table_number
            AND ABS(DATEDIFF(MINUTE, [reservation_date], @reservation_date)) < 15
            AND [status] = 'Confirmed'";

                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();

                    using (SqlCommand checkCommand = new SqlCommand(checkAvailabilityQuery, connection))
                    {
                        checkCommand.Parameters.AddWithValue("@table_number", reservation.TableNumber);
                        checkCommand.Parameters.AddWithValue("@reservation_date", reservation.ReservationDate);

                        int existingReservations = (int)checkCommand.ExecuteScalar();

                        if (existingReservations > 0)
                        {
                            return new GenericResponse<Reservation>
                            {
                                Msg = "Table already reserved.",
                                Success = false
                            };
                        }
                    }

                    string query = @"
                INSERT INTO [UniEats].[dbo].[Reservations] ([user_id], [reservation_date], [number_of_people], [status], [table_number], [created_at])
                VALUES (@user_id, @reservation_date, @number_of_people, @status, @table_number, @created_at);
                SELECT SCOPE_IDENTITY();";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@user_id", reservation.UserId);
                        command.Parameters.AddWithValue("@reservation_date", reservation.ReservationDate);
                        command.Parameters.AddWithValue("@number_of_people", reservation.NumberOfPeople);
                        command.Parameters.AddWithValue("@status", "Confirmed");
                        command.Parameters.AddWithValue("@table_number", reservation.TableNumber);
                        command.Parameters.AddWithValue("@created_at", DateTime.Now);

                        int new_ID = Convert.ToInt32(command.ExecuteScalar()); // Safely cast decimal to int

                        Reservation newReservation = new Reservation
                        {
                            ReservationId = new_ID,
                            UserId = reservation.UserId,
                            ReservationDate = reservation.ReservationDate,
                            NumberOfPeople = reservation.NumberOfPeople,
                            Status = "Confirmed",
                            TableNumber = reservation.TableNumber,
                            CreatedAt = DateTime.Now
                        };

                        return new GenericResponse<Reservation>
                        {
                            Msg = "Reservation made successfully!",
                            Success = true,
                            data = newReservation
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                return new GenericResponse<Reservation>
                {
                    Msg = ex.Message,
                    Success = false
                };
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
                        command.Parameters.AddWithValue("@reservation_date", reservationDate.Date);

                        int count = (int)command.ExecuteScalar();
                        return new GenericResponse<bool>
                        {
                            Success = true,
                            data = count > 0
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                return new GenericResponse<bool>
                {
                    Success = false,
                    Msg = ex.Message
                };
            }
        }


        // Cancel Reservation
        [HttpPost("cancelreservation/{reservationId}")]
        public GenericResponse<bool> CancelReservation(int reservationId)
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
                            return new GenericResponse<bool>
                            {
                                Success = true,
                                data = true
                            };
                        }
                        else
                        {
                            return new GenericResponse<bool>
                            {
                                Success = true,
                                data = false
                            };
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return new GenericResponse<bool>
                {
                    Success = true,
                    Msg = ex.Message
                };
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