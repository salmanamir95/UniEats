import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../GenericResponse/generic-response';
import { SalesReport } from '../../models/sales-report';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

private readonly baseUrl= 'http://localhost:5043/api/Sales'

  constructor(private http: HttpClient) {}

  /**
   * Generate today's sales report.
   * @returns Observable of GenericResponse with SalesReport data.
   */
  generateTodaySaleReport(): Observable<GenericResponse<SalesReport>> {
    return this.http.get<GenericResponse<SalesReport>>(`${this.baseUrl}/GenerateTodaySaleReport`);
  }

  /**
   * Generate sales report based on the report type (weekly, monthly, annually).
   * @param reportType Type of the report to generate.
   * @returns Observable of GenericResponse with SalesReport data.
   */
  generateSalesReport(reportType: string): Observable<GenericResponse<SalesReport>> {
    const params = new HttpParams().set('reportType', reportType);
    return this.http.get<GenericResponse<SalesReport>>(`${this.baseUrl}/GenerateSalesReport`, { params });
  }
}

