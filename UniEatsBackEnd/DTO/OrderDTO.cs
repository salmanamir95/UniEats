using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.DTO
{
    public class OrderDTO
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }
        public string DeliveryMethod { get; set; }
        public int TableNumber { get; set; }
        public string OrderNotes { get; set; }
    }
}