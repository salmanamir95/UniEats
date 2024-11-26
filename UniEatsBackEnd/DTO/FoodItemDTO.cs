using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.DTO
{
    public class FoodItemDTO
    {
        public int ItemId { get; set; }
        public int StockAdded { get; set; }
        public DateTime RestockDate { get; set; }
    }
}