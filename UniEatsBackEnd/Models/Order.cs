using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public DateTime OrderDate { get; set; } = DateTime.Now;

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Total amount must be non-negative.")]
        public decimal TotalAmount { get; set; }

        [Required]
        [RegularExpression("(Pending|Completed|Canceled)", ErrorMessage = "Invalid status.")]
        public string Status { get; set; } = "Pending";

        [Required]
        [RegularExpression("(Card|Cash)", ErrorMessage = "Invalid payment method.")]
        public string PaymentMethod { get; set; }

        [Required]
        [RegularExpression("(Pickup|Delivery)", ErrorMessage = "Invalid delivery method.")]
        public string DeliveryMethod { get; set; }
    }
}