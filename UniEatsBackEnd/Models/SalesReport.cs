using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniEatsBackEnd.Models
{
    public class SalesReport
    {
        public int ReportId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Total sales must be a non-negative value.")]
        public decimal TotalSales { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Number of orders must be a non-negative value.")]
        public int NumberOfOrders { get; set; }

        [RegularExpression(@"^(Daily|Weekly|Monthly|Annual)$", ErrorMessage = "Report type must be 'Daily', 'Weekly', 'Monthly', or 'Annual'.")]
        public string ReportType { get; set; }

        public DateTime GeneratedAt { get; set; } = DateTime.Now;

        // Custom validation to ensure end date is greater than or equal to start date
        public bool IsValid()
        {
            return EndDate >= StartDate;
        }
    }
}