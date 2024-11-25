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
        [Key]
        public int InventoryId { get; set; }

        [Required]
        public int ItemId { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Stock added must be non-negative.")]
        public int StockAdded { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Stock removed must be non-negative.")]
        public int StockRemoved { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public int CurrentStock => StockAdded - StockRemoved;

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}