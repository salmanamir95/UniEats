using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.DTO
{
    public class RealFoodItemDTO
    {
        public int ItemId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public bool Availability { get; set; }
        public int StockQuantity { get; set; }
        public decimal Discount { get; set; }
    }
}