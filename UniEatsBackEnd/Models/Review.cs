using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.Models
{
    public class Review
    {
        public int ReviewId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int ItemId { get; set; }

        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }

        [StringLength(100)]
        public string ReviewTitle { get; set; }

        public string ReviewText { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation properties (User, FoodItem)
        public User User { get; set; }
        public FoodItem FoodItem { get; set; }
    }
}