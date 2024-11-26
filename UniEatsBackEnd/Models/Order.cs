using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.Models
{
    public class Order
    {
        public int OrderId { get; set; }

        [Required]
        public int UserId { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now;

        [Range(0.01, double.MaxValue, ErrorMessage = "Total amount must be greater than or equal to 0.")]
        public decimal TotalAmount { get; set; }

        [RegularExpression(@"^(Pending|Completed|Canceled)$", ErrorMessage = "Status must be 'Pending', 'Completed', or 'Canceled'.")]
        public string Status { get; set; } = "Pending";

        [RegularExpression(@"^(Card|Cash|Online|GiftCard)$", ErrorMessage = "Payment method must be one of: 'Card', 'Cash', 'Online', 'GiftCard'.")]
        public string PaymentMethod { get; set; }

        [RegularExpression(@"^(Pickup|Delivery)$", ErrorMessage = "Delivery method must be either 'Pickup' or 'Delivery'.")]
        public string DeliveryMethod { get; set; }

        [StringLength(255)]
        public string DeliveryAddress { get; set; }

        [StringLength(255)]
        public string OrderNotes { get; set; }

        // Navigation property (User)
        public User? User { get; set; }
    }
}