export interface SalesReport {
  reportId: number; // Unique identifier for the sales report
  startDate: Date; // Start date of the report period
  endDate: Date; // End date of the report period
  totalSales: number; // Total sales in the report period, must be >= 0
  numberOfOrders: number; // Number of orders in the report period, must be >= 0
  reportType: 'Daily' | 'Weekly' | 'Monthly' | 'Annual'; // Type of report
  generatedAt?: Date; // Date when the report was generated, defaults to current date
}
