using System;
using System.Collections.Generic;
using System.Linq;
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
    public class UserController : ControllerBase
    {

        private readonly string? _conn;
        private readonly IConfiguration _configuration;  // Declare IConfiguration

        public UserController(IConfiguration configuration)
        {

            _configuration = configuration;
            _conn = _configuration.GetConnectionString("DefaultConnection");
        }

        [HttpGet("GetAllUsers")]

        public GenericResponse<List<User>> Get_AllUsers()
        {
            try
            {
                List<User> users = new List<User>();

                // Using 'using' to ensure connection is disposed properly.
                using (SqlConnection connect = new SqlConnection(_conn))
                {
                    connect.Open();
                    string query = "SELECT * FROM Users;";
                    using (SqlCommand command = new SqlCommand(query, connect))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                var user = new User
                                {
                                    UserId = Convert.ToInt32(reader["user_id"]),
                                    Username = Convert.ToString(reader["username"]),
                                    Password = Convert.ToString(reader["password"]),
                                    FirstName = Convert.ToString(reader["first_name"]),
                                    LastName = Convert.ToString(reader["last_name"]),
                                    Email = Convert.ToString(reader["email"]),
                                    Role = Convert.ToString(reader["role"]),
                                    PhoneNumber = Convert.ToString(reader["phone_number"]),
                                    CreatedAt = Convert.ToDateTime(reader["created_at"])
                                };
                                users.Add(user);
                            }
                        }
                    }
                    connect.Close();
                }

                return new GenericResponse<List<User>> { Success = true, data = users, Msg = "all ok" };
            }
            catch (Exception error)
            {
                return new GenericResponse<List<User>> { Success = false, Msg = error.Message };
            }
        }

        [HttpPost("Login")]
        public GenericResponse<User> Login([FromBody] LoginByUsername loginByUsername)
        {

            try
            {
                User user = new User();

                // Using 'using' to ensure connection is disposed properly.
                using (SqlConnection connect = new SqlConnection(_conn))
                {
                    connect.Open();
                    string query = "SELECT * FROM [Users] WHERE username = @Username AND password =@pass;";
                    using (SqlCommand command = new SqlCommand(query, connect))
                    {
                        command.Parameters.AddWithValue("@Username", loginByUsername.username);
                        command.Parameters.AddWithValue("@pass", loginByUsername.password);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {

                            while (reader.Read())
                            {
                                user = new User
                                {
                                    UserId = Convert.ToInt32(reader["user_id"]),
                                    Username = Convert.ToString(reader["username"]),
                                    Password = Convert.ToString(reader["password"]),
                                    FirstName = Convert.ToString(reader["first_name"]),
                                    LastName = Convert.ToString(reader["last_name"]),
                                    Email = Convert.ToString(reader["email"]),
                                    Role = Convert.ToString(reader["role"]),
                                    PhoneNumber = Convert.ToString(reader["phone_number"]),
                                    CreatedAt = Convert.ToDateTime(reader["created_at"])
                                };

                            }
                        }
                    }
                    connect.Close();
                }

                return new GenericResponse<User> { Success = true, data = user, Msg = "all ok" };
            }
            catch (Exception error)
            {
                return new GenericResponse<User> { Success = false, Msg = error.Message };
            }

        }


        [HttpPost("Register")]
        public GenericResponse<User> Register( RegisterUser registerUserDto)
        {
            try
            {
                using (SqlConnection connect = new SqlConnection(_conn))
                {
                    connect.Open();

                    string query = "INSERT INTO Users (username, password, first_name, last_name, email, phone_number, role, created_at) " +
                                   "VALUES (@Username, @Password, @FirstName, @LastName, @Email, @PhoneNumber, @Role, @CreatedAt)";

                    using (SqlCommand command = new SqlCommand(query, connect))
                    {
                        command.Parameters.AddWithValue("@Username", registerUserDto.Username);
                        command.Parameters.AddWithValue("@Password", registerUserDto.Password); // Consider hashing the password before storing it.
                        command.Parameters.AddWithValue("@FirstName", registerUserDto.FirstName);
                        command.Parameters.AddWithValue("@LastName", registerUserDto.LastName);
                        command.Parameters.AddWithValue("@Email", registerUserDto.Email);
                        command.Parameters.AddWithValue("@PhoneNumber", registerUserDto.PhoneNumber);
                        command.Parameters.AddWithValue("@Role", registerUserDto.Role);
                        command.Parameters.AddWithValue("@CreatedAt", DateTime.Now);

                        command.ExecuteNonQuery();
                    }
                    connect.Close();
                }

                return new GenericResponse<User> { Success = true, Msg = "User registered successfully" };
            }
            catch (Exception error)
            {
                return new GenericResponse<User> { Success = false, Msg = error.Message };
            }
        }

        // [HttpPost("ForgotPassword")]
        // public async Task<GenericResponse> ForgotPassword( ForgotPasswordDto forgotPasswordDto)
        // {
        //     try
        //     {
        //         // You could send an email with an OTP or a password reset link here.
        //         // For simplicity, this will just simulate it.

        //         using (SqlConnection connect = new SqlConnection(_conn))
        //         {
        //             await connect.OpenAsync();
        //             string query = "SELECT * FROM User WHERE email = @Email";

        //             using (SqlCommand command = new SqlCommand(query, connect))
        //             {
        //                 command.Parameters.AddWithValue("@Email", forgotPasswordDto.Email);
        //                 using (SqlDataReader reader = await command.ExecuteReaderAsync())
        //                 {
        //                     if (reader.Read())
        //                     {
        //                         // Logic for generating OTP or sending reset email.
        //                     }
        //                     else
        //                     {
        //                         return new GenericResponse { Success = false, Msg = "Email not found" };
        //                     }
        //                 }
        //             }
        //         }

        //         return new GenericResponse { Success = true, Msg = "Password reset email sent." };
        //     }
        //     catch (Exception error)
        //     {
        //         return new GenericResponse { Success = false, Msg = error.Message };
        //     }
        // }

        // after deployment

        [HttpPut("EditProfile")]
        public GenericResponse<bool> EditProfile( User editProfileDto)
        {
            try
            {
                using (SqlConnection connect = new SqlConnection(_conn))
                {
                    connect.Open();

                    string query = "UPDATE User SET first_name = @FirstName, last_name = @LastName, email = @Email, phone_number = @PhoneNumber, username= @Username, password= @Pass " +
                                   "WHERE user_id = @UserId";

                    using (SqlCommand command = new SqlCommand(query, connect))
                    {
                        command.Parameters.AddWithValue("@UserId", editProfileDto.UserId);
                        command.Parameters.AddWithValue("@FirstName", editProfileDto.FirstName);
                        command.Parameters.AddWithValue("@LastName", editProfileDto.LastName);
                        command.Parameters.AddWithValue("@Email", editProfileDto.Email);
                        command.Parameters.AddWithValue("@PhoneNumber", editProfileDto.PhoneNumber);
                        command.Parameters.AddWithValue("@Pass", editProfileDto.Password);
                        command.Parameters.AddWithValue("@Username", editProfileDto.Username);

                        command.ExecuteNonQuery();
                    }
                    connect.Close();
                }

                return new GenericResponse<bool> { Success = true, data=true,Msg = "Profile updated successfully" };
            }
            catch (Exception error)
            {
                return new GenericResponse<bool> { Success = false, Msg = error.Message };
            }
        }

        [HttpPost("OrderHistory")]

        public GenericResponse<List<Order>> OrderList( int UID)
        {
            try{
                List<Order> orders = new List<Order>();

                // Using 'using' to ensure connection is disposed properly.
                using (SqlConnection connect = new SqlConnection(_conn))
                {
                    connect.Open();
                    string query = "SELECT * FROM Orders WHERE user_id = @UID ;";
                    using (SqlCommand command = new SqlCommand(query, connect))
                    {
                        command.Parameters.AddWithValue("@UID", UID);
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Order order = new Order    
                                {
                                    UserId = Convert.ToInt32(reader["user_id"]),
                                    OrderId = Convert.ToInt32(reader["order_id"]),
                                    OrderDate = Convert.ToDateTime(reader["order_date"]),
                                    TotalAmount = Convert.ToInt32(reader["total_amount"]),
                                    Status = Convert.ToString(reader["status"]),
                                    PaymentMethod = Convert.ToString(reader["payment_method"]),
                                    DeliveryMethod = Convert.ToString(reader["delivery_method"]),
                                    DeliveryAddress = Convert.ToString(reader["delivery_address"]),
                                    OrderNotes = Convert.ToString(reader["order_notes"])
                                };
                                orders.Add(order);
                            }
                        }
                    }
                    connect.Close();
                }
                return new GenericResponse<List<Order>>{
                    Success= true,
                    data= orders,

                };
            }
            catch(Exception ex)
            {
                return new GenericResponse<List<Order>>{
                    Success=false,
                    Msg= ex.Message
                };
            }
        }

    }
}

// UC-01: Identify User
// UC-02: Login
// UC-03: Register
// UC-19: View Orders (related to user profile)


// _________________________________________________________

// User Management
// Forgot Password

// Allow users to reset their password via email or OTP.
// Use Case: Add a ForgotPassword method in the UserController.
// Edit Profile

// Allow users to update their personal details (e.g., name, email, phone).
// Use Case: Add an EditProfile method in the UserController.
// User Roles and Permissions

// Implement roles such as Admin, Staff, and Customer to control access.
// Use Case: Role-based functionality for admin and staff.