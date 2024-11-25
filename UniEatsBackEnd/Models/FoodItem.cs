using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.Models
{
    public class FoodItem
    {
        public int ItemId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [RegularExpression(@"^(Drinks|Snacks|Meals|Appetizers|Desserts)$", ErrorMessage = "Category must be one of: 'Drinks', 'Snacks', 'Meals', 'Appetizers', or 'Desserts'.")]
        public string Category { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }

        public string Description { get; set; }

        [StringLength(255)]
        [Url]
        public string ImageUrl { get; set; }

        public bool Availability { get; set; } = true;

        [Range(0, int.MaxValue, ErrorMessage = "Stock quantity must be a non-negative value.")]
        public int StockQuantity { get; set; }

        [Range(0, 100, ErrorMessage = "Discount must be between 0 and 100.")]
        public decimal Discount { get; set; } = 0;
    }
}