using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than 0.")]
        public decimal Amount { get; set; }

        [RegularExpression(@"^(Card|Cash|Online|GiftCard)$", ErrorMessage = "Payment method must be one of: 'Card', 'Cash', 'Online', 'GiftCard'.")]
        public string PaymentMethod { get; set; }

        [RegularExpression(@"^(Paid|Pending|Refunded)$", ErrorMessage = "Payment status must be one of: 'Paid', 'Pending', or 'Refunded'.")]
        public string PaymentStatus { get; set; } = "Pending";

        [StringLength(100)]
        public string TransactionId { get; set; }

        public DateTime PaymentDate { get; set; } = DateTime.Now;

        [Range(0, double.MaxValue, ErrorMessage = "Refund amount must be greater than or equal to 0.")]
        public decimal RefundAmount { get; set; } = 0;

        // Navigation property (Order)
        public Order Order { get; set; }
    }
}