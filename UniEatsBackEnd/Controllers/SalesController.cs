using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using UniEatsBackEnd.DTO;
using UniEatsBackEnd.GenericResponse;
using UniEatsBackEnd.Models;

namespace UniEatsBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesController : ControllerBase
    {
        private readonly string? _conn;
        private readonly IConfiguration _configuration;  // Declare IConfiguration

        public SalesController(IConfiguration configuration)
        {

            _configuration = configuration;
            _conn = _configuration.GetConnectionString("DefaultConnection");
        }

        [HttpGet("GenerateTodaySaleReport")]

        public GenericResponse<bool> GenerateTodaySale()
        {
            DateTime dateTime = DateTime.Now;
        }

    }
}

// UC-25: Sales Report
// UC-26: Generate Report

// _____________________________  
// Customer Analytics

// Provide the owner with insights on frequent customers, popular items, etc.
// Use Case: Extend SalesReportController to include customer analytics.
// Inventory Forecasting

// Predict low stock items based on sales trends.
// Use Case: Add InventoryForecasting functionality in InventoryController.

