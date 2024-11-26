using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.DTO
{
    public class PaymentDTO
    {
        public int PaymentId { get; set; }
        public int OrderId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public string PaymentStatus { get; set; }
        public string TransactionId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal RefundAmount { get; set; }
    }
}