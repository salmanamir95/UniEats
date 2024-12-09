using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.DTO
{
    public class AddImageFoodDTO
    {

        public int ItemId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }

        // Change the type from string to IFormFile for image upload
        public IFormFile ImageUrl { get; set; }

        public bool Availability { get; set; }
        public int StockQuantity { get; set; }
        public decimal Discount { get; set; }
    }
}