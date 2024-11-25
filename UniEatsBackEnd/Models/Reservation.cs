using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.Models
{
    public class Reservation
    {
        [Key]
        public int ReservationId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public DateTime ReservationDate { get; set; } = DateTime.Now;

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Number of people must be greater than 0.")]
        public int NumberOfPeople { get; set; }

        [Required]
        [RegularExpression("(Confirmed|Canceled)", ErrorMessage = "Invalid status.")]
        public string Status { get; set; } = "Confirmed";

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}