using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.Models
{
    public class Inventory
    {
        public int InventoryId { get; set; }

        [Required]
        public int ItemId { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Stock added must be a non-negative value.")]
        public int StockAdded { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Stock removed must be a non-negative value.")]
        public int StockRemoved { get; set; }

        public int CurrentStock => StockAdded - StockRemoved;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public DateTime? RestockDate { get; set; }

        // Navigation property (FoodItem)
        public FoodItem FoodItem { get; set; }
    }
}