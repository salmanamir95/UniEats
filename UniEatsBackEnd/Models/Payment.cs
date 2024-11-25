using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0.")]
        public decimal Amount { get; set; }

        [Required]
        [RegularExpression("(Card|Cash)", ErrorMessage = "Invalid payment method.")]
        public string PaymentMethod { get; set; }

        [Required]
        [RegularExpression("(Paid|Pending)", ErrorMessage = "Invalid payment status.")]
        public string PaymentStatus { get; set; } = "Pending";

        public string TransactionId { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; } = DateTime.Now;
    }
}