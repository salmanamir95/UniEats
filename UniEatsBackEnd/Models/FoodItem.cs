using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.Models
{
    public class FoodItem
    {
        [Key]
        public int ItemId { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [RegularExpression("(Drinks|Snacks|Meals)", ErrorMessage = "Invalid category.")]
        public string Category { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }

        public string Description { get; set; }

        [Url]
        public string ImageUrl { get; set; }

        public bool Availability { get; set; } = true;

        [Range(0, int.MaxValue, ErrorMessage = "Stock quantity must be non-negative.")]
        public int StockQuantity { get; set; }
    }
}