using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.Models
{
    public class SalesReport
    {
        [Key]
        public int ReportId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Total sales must be non-negative.")]
        public decimal TotalSales { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Number of orders must be non-negative.")]
        public int NumberOfOrders { get; set; }

        [Required]
        public DateTime GeneratedAt { get; set; } = DateTime.Now;
    }
}