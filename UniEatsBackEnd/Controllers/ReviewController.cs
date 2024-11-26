using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using UniEatsBackEnd.GenericResponse;
using UniEatsBackEnd.Models;

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly string? _conn;
        private readonly IConfiguration _configuration;

        public ReviewController(IConfiguration configuration)
        {
            _configuration = configuration;
            _conn = _configuration.GetConnectionString("DefaultConnection");
        }

        [HttpGet("GetReviews")]
        public GenericResponse<List<Review>> GetReviews()
        {
            List<Review> reviews = new List<Review>();

            try
            {
                using (SqlConnection connection = new SqlConnection(_conn))
                {
                    connection.Open();
                    string query = "SELECT * FROM [UniEats].[dbo].[Reviews]";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Review review = new Review
                                {
                                    ReviewId = reader.GetInt32(reader.GetOrdinal("review_id")),
                                    UserId = reader.GetInt32(reader.GetOrdinal("user_id")),
                                    ItemId = reader.GetInt32(reader.GetOrdinal("item_id")),
                                    Rating = reader.GetInt32(reader.GetOrdinal("rating")),
                                    ReviewTitle = reader.GetString(reader.GetOrdinal("review_title")),
                                    ReviewText = reader.GetString(reader.GetOrdinal("review_text")),
                                    CreatedAt = reader.GetDateTime(reader.GetOrdinal("created_at"))
                                };
                                reviews.Add(review);
                            }
                        }
                        connection.Close();
                    }
                }

                return new GenericResponse<List<Review>>
                {
                    Success = true,
                    data = reviews
                }; // Return reviews as JSON response
            }
            catch (Exception ex)
            {
                return new GenericResponse<List<Review>>
                {
                    Success = false,
                    Msg = ex.Message
                };
            }
        }

        // POST: api/review
            [HttpPost("givereview")]
            public GenericResponse<bool> GiveReview([FromBody] Review review)
            {
                if (review == null)
                {
                    return new GenericResponse<bool>{
                        Success = false,
                        Msg= "Empty Review"
                    };
                }

                if (string.IsNullOrEmpty(_conn))
                {
                    return new GenericResponse<bool>{
                        Success=false,
                        Msg= "Connection String is empty"
                    };
                }

                try
                {
                    // SQL query to insert a new review into the Reviews table
                    string query = @"
                    INSERT INTO [UniEats].[dbo].[Reviews] ([user_id], [item_id], [rating], [review_title], [review_text], [created_at])
                    VALUES (@user_id, @item_id, @rating, @review_title, @review_text, @created_at);
                ";

                    // Use SqlConnection and SqlCommand to insert the review into the database
                    using (SqlConnection connection = new SqlConnection(_conn))
                    {
                        connection.Open();

                        using (SqlCommand command = new SqlCommand(query, connection))
                        {
                            // Add parameters to prevent SQL injection
                            command.Parameters.AddWithValue("@user_id", review.UserId);
                            command.Parameters.AddWithValue("@item_id", review.ItemId);
                            command.Parameters.AddWithValue("@rating", review.Rating);
                            command.Parameters.AddWithValue("@review_title", review.ReviewTitle);
                            command.Parameters.AddWithValue("@review_text", review.ReviewText);
                            command.Parameters.AddWithValue("@created_at", DateTime.UtcNow);

                            int rowsAffected = command.ExecuteNonQuery();
                            if (rowsAffected > 0)
                            {
                                return new GenericResponse<bool>{
                                    Success= true,
                                    data= true
                                };
                            }
                            else
                            {
                                return new GenericResponse<bool>{
                                    Success= true,
                                    data = false
                                };
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    return new GenericResponse<bool>{
                        Success=false,
                        Msg= ex.Message
                    };
                }
            }

    }
}
// UC-11: Give Review