using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.DTO
{
    public class CartItemDTO
    {
         public int ItemId { get; set; } // The ID of the food item
        public string Name { get; set; } // Name of the food item
        public decimal Price { get; set; } // Price of the food item
        public int Quantity { get; set; } // Quantity of the item in the cart
        public string ImageUrl { get; set; } // Image URL for the food item
    }
}