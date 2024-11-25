using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.Models
{
    public class Reservation
    {
        public int ReservationId { get; set; }

        [Required]
        public int UserId { get; set; }

        public DateTime ReservationDate { get; set; } = DateTime.Now;

        [Range(1, int.MaxValue, ErrorMessage = "Number of people must be greater than 0.")]
        public int NumberOfPeople { get; set; }

        [RegularExpression(@"^(Confirmed|Canceled)$", ErrorMessage = "Status must be 'Confirmed' or 'Canceled'.")]
        public string Status { get; set; } = "Confirmed";

        [Range(1, int.MaxValue, ErrorMessage = "Table number must be greater than 0.")]
        public int TableNumber { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation property (User)
        public User User { get; set; }
    }
}