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
        private readonly IConfiguration _configuration;

        public SalesController(IConfiguration configuration)
        {
            _configuration = configuration;
            _conn = _configuration.GetConnectionString("DefaultConnection");
        }

        [HttpGet("GenerateTodaySaleReport")]
        public GenericResponse<SalesReport> GenerateTodaySale()
        {
            try
            {
                DateTime dateTime = DateTime.Now;

                SalesReport salesReport = new SalesReport
                {
                    ReportId = 1,
                    StartDate = dateTime,
                    EndDate = dateTime,
                    TotalSales = 0,
                    NumberOfOrders = 0,
                    ReportType = "Daily",
                    GeneratedAt = dateTime
                };

                using (SqlConnection connect = new SqlConnection(_conn))
                {
                    connect.Open();

                    // Query to check if the report for yesterday exists
                    string query1 = "SELECT * FROM SalesReports WHERE CAST([GeneratedAt] AS DATE) = @DID";
                    using (SqlCommand cmd1 = new SqlCommand(query1, connect))
                    {
                        cmd1.Parameters.AddWithValue("@DID", dateTime.Date.AddDays(-1));
                        SqlDataReader reader1 = cmd1.ExecuteReader();

                        if (!reader1.HasRows)
                        {
                            // Get total sales and number of orders for yesterday
                            string query2 = @"
                                SELECT COUNT([order_id]) AS TotalSales, 
                                       SUM([total_amount]) AS TotalAmount
                                FROM [UniEats].[dbo].[Orders]
                                WHERE CAST([order_date] AS DATE) = @DID 
                                AND Status = 'Completed';";
                            using (SqlCommand cmd2 = new SqlCommand(query2, connect))
                            {
                                cmd2.Parameters.AddWithValue("@DID", dateTime.Date.AddDays(-1));
                                SqlDataReader reader2 = cmd2.ExecuteReader();
                                if (reader2.Read())
                                {
                                    salesReport.TotalSales = Convert.ToInt32(reader2["TotalSales"]);
                                    salesReport.NumberOfOrders = Convert.ToInt32(reader2["TotalAmount"]);
                                }
                            }

                            // Insert report for yesterday into the SalesReport table
                            string insertQuery1 = @"
                                INSERT INTO SalesReports (StartDate, EndDate, TotalSales, NumberOfOrders, ReportType, GeneratedAt)
                                VALUES (@StartDate, @EndDate, @TotalSales, @NumberOfOrders, @ReportType, @GeneratedAt);
                            ";
                            using (SqlCommand cmdInsert1 = new SqlCommand(insertQuery1, connect))
                            {
                                cmdInsert1.Parameters.AddWithValue("@StartDate", dateTime.Date.AddDays(-1));
                                cmdInsert1.Parameters.AddWithValue("@EndDate", dateTime.Date.AddDays(-1));
                                cmdInsert1.Parameters.AddWithValue("@TotalSales", salesReport.TotalSales);
                                cmdInsert1.Parameters.AddWithValue("@NumberOfOrders", salesReport.NumberOfOrders);
                                cmdInsert1.Parameters.AddWithValue("@ReportType", salesReport.ReportType);
                                cmdInsert1.Parameters.AddWithValue("@GeneratedAt", dateTime.Date.AddDays(-1));
                                cmdInsert1.ExecuteNonQuery();
                            }
                        }
                    }

                    // Query for today's sales data
                    string query3 = @"
                        SELECT COUNT([order_id]) AS TotalSales, 
                               SUM([total_amount]) AS TotalAmount
                        FROM [UniEats].[dbo].[Orders]
                        WHERE CAST([order_date] AS DATE) = @DID 
                        AND Status = 'Completed';";
                    using (SqlCommand cmd3 = new SqlCommand(query3, connect))
                    {
                        cmd3.Parameters.AddWithValue("@DID", dateTime.Date);
                        SqlDataReader reader3 = cmd3.ExecuteReader();
                        if (reader3.Read())
                        {
                            salesReport.TotalSales = Convert.ToInt32(reader3["TotalSales"]);
                            salesReport.NumberOfOrders = Convert.ToInt32(reader3["TotalAmount"]);
                        }
                    }

                    // Insert today's report into the SalesReport table
                    string insertQuery2 = @"
                        INSERT INTO SalesReports (StartDate, EndDate, TotalSales, NumberOfOrders, ReportType, GeneratedAt)
                        VALUES (@StartDate, @EndDate, @TotalSales, @NumberOfOrders, @ReportType, @GeneratedAt);
                        SELECT SCOPE_IDENTITY();"; // Get the ID of the last inserted record
                    using (SqlCommand cmdInsert2 = new SqlCommand(insertQuery2, connect))
                    {
                        cmdInsert2.Parameters.AddWithValue("@StartDate", dateTime.Date);
                        cmdInsert2.Parameters.AddWithValue("@EndDate", dateTime.Date);
                        cmdInsert2.Parameters.AddWithValue("@TotalSales", salesReport.TotalSales);
                        cmdInsert2.Parameters.AddWithValue("@NumberOfOrders", salesReport.NumberOfOrders);
                        cmdInsert2.Parameters.AddWithValue("@ReportType", salesReport.ReportType);
                        cmdInsert2.Parameters.AddWithValue("@GeneratedAt", dateTime.Date);

                        // Get the ReportId of the inserted row
                        int newReportId = Convert.ToInt32(cmdInsert2.ExecuteScalar());
                        salesReport.ReportId = newReportId;
                    }

                    connect.Close();
                }

                return new GenericResponse<SalesReport>
                {
                    Success = true,
                    data = salesReport
                };
            }
            catch (Exception ex)
            {
                return new GenericResponse<SalesReport>
                {
                    Success = false,
                    Msg = ex.Message
                };
            }
        }


        [HttpGet("GenerateSalesReport")]
        public GenericResponse<SalesReport> GenerateSalesReport(string reportType)
        {
            try
            {
                DateTime dateTime = DateTime.Now;
                SalesReport salesReport = new SalesReport
                {
                    ReportId = 0,
                    TotalSales = 0,
                    NumberOfOrders = 0,
                    GeneratedAt = dateTime
                };

                // Set the date range based on the report type
                DateTime startDate, endDate;

                switch (reportType.ToLower())
                {
                    case "weekly":
                        // Get start and end date of the current week (Monday to Sunday)
                        startDate = dateTime.AddDays(-(int)dateTime.DayOfWeek + (int)DayOfWeek.Monday);
                        endDate = startDate.AddDays(6);
                        salesReport.ReportType = "Weekly";
                        break;

                    case "monthly":
                        // Get start and end date of the current month
                        startDate = new DateTime(dateTime.Year, dateTime.Month, 1);
                        endDate = startDate.AddMonths(1).AddDays(-1);
                        salesReport.ReportType = "Monthly";
                        break;

                    case "annually":
                        // Get start and end date of the current year
                        startDate = new DateTime(dateTime.Year, 1, 1);
                        endDate = new DateTime(dateTime.Year, 12, 31);
                        salesReport.ReportType = "Annual";
                        break;

                    default:
                        return new GenericResponse<SalesReport>
                        {
                            Success = false,
                            Msg = "Invalid report type specified. Valid values are 'weekly', 'monthly', or 'annually'."
                        };
                }

                salesReport.StartDate = startDate;
                salesReport.EndDate = endDate;

                using (SqlConnection connect = new SqlConnection(_conn))
                {
                    connect.Open();

                    // Query to check if the report for the selected period already exists
                    string query1 = "SELECT * FROM SalesReports WHERE CAST([StartDate] AS DATE) = @StartDate AND CAST([EndDate] AS DATE) = @EndDate";
                    using (SqlCommand cmd1 = new SqlCommand(query1, connect))
                    {
                        cmd1.Parameters.AddWithValue("@StartDate", startDate.Date);
                        cmd1.Parameters.AddWithValue("@EndDate", endDate.Date);
                        SqlDataReader reader1 = cmd1.ExecuteReader();

                        if (!reader1.HasRows)
                        {
                            // Get total sales and number of orders for the selected period
                            string query2 = @"
                        SELECT COUNT([order_id]) AS TotalSales, 
                               SUM([total_amount]) AS TotalAmount
                        FROM [UniEats].[dbo].[Orders]
                        WHERE CAST([order_date] AS DATE) BETWEEN @StartDate AND @EndDate
                        AND Status = 'Completed';";
                            using (SqlCommand cmd2 = new SqlCommand(query2, connect))
                            {
                                cmd2.Parameters.AddWithValue("@StartDate", startDate.Date);
                                cmd2.Parameters.AddWithValue("@EndDate", endDate.Date);
                                SqlDataReader reader2 = cmd2.ExecuteReader();
                                if (reader2.Read())
                                {
                                    salesReport.TotalSales = Convert.ToInt32(reader2["TotalSales"]);
                                    salesReport.NumberOfOrders = Convert.ToInt32(reader2["TotalAmount"]);
                                }
                            }

                            // Insert the report into the SalesReport table
                            string insertQuery = @"
                        INSERT INTO SalesReports (StartDate, EndDate, TotalSales, NumberOfOrders, ReportType, GeneratedAt)
                        VALUES (@StartDate, @EndDate, @TotalSales, @NumberOfOrders, @ReportType, @GeneratedAt);
                        SELECT SCOPE_IDENTITY();"; // Get the ID of the last inserted record
                            using (SqlCommand cmdInsert = new SqlCommand(insertQuery, connect))
                            {
                                cmdInsert.Parameters.AddWithValue("@StartDate", startDate.Date);
                                cmdInsert.Parameters.AddWithValue("@EndDate", endDate.Date);
                                cmdInsert.Parameters.AddWithValue("@TotalSales", salesReport.TotalSales);
                                cmdInsert.Parameters.AddWithValue("@NumberOfOrders", salesReport.NumberOfOrders);
                                cmdInsert.Parameters.AddWithValue("@ReportType", salesReport.ReportType);
                                cmdInsert.Parameters.AddWithValue("@GeneratedAt", dateTime.Date);

                                // Get the ReportId of the inserted row
                                int newReportId = Convert.ToInt32(cmdInsert.ExecuteScalar());
                                salesReport.ReportId = newReportId;
                            }
                        }
                    }

                    connect.Close();
                }

                return new GenericResponse<SalesReport>
                {
                    Success = true,
                    data = salesReport
                };
            }
            catch (Exception ex)
            {
                return new GenericResponse<SalesReport>
                {
                    Success = false,
                    Msg = ex.Message
                };
            }
        }

        [HttpGet("GetAllReports")]
        public GenericResponse<List<SalesReport>> GetAllReports()
        {
            try
            {
                List<SalesReport> reports = new List<SalesReport>();

                using (SqlConnection connect = new SqlConnection(_conn))
                {
                    connect.Open();

                    // Query to get all reports from SalesReports table
                    string query = "SELECT * FROM SalesReports ORDER BY GeneratedAt DESC"; // Order by latest generated reports
                    using (SqlCommand cmd = new SqlCommand(query, connect))
                    {
                        SqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            SalesReport report = new SalesReport
                            {
                                ReportId = Convert.ToInt32(reader["ReportId"]),
                                StartDate = Convert.ToDateTime(reader["StartDate"]),
                                EndDate = Convert.ToDateTime(reader["EndDate"]),
                                TotalSales = Convert.ToInt32(reader["TotalSales"]),
                                NumberOfOrders = Convert.ToInt32(reader["NumberOfOrders"]),
                                ReportType = reader["ReportType"].ToString(),
                                GeneratedAt = Convert.ToDateTime(reader["GeneratedAt"])
                            };
                            reports.Add(report);
                        }
                    }

                    connect.Close();
                }

                return new GenericResponse<List<SalesReport>>
                {
                    Success = true,
                    data = reports
                };
            }
            catch (Exception ex)
            {
                return new GenericResponse<List<SalesReport>>
                {
                    Success = false,
                    Msg = ex.Message
                };
            }
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

