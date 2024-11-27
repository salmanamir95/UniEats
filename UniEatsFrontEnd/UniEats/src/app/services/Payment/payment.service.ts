import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../GenericResponse/generic-response';
import { PaymentDTO } from '../../interfaces/payment-dto';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly baseUrl = 'http://localhost:5043/api/Payment';

  constructor(private http: HttpClient) {}

  /**
   * Make a payment.
   * @param payment PaymentDTO containing the payment details.
   * @returns Observable of GenericResponse with a success message.
   */
  makePayment(payment: PaymentDTO): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(`${this.baseUrl}/pay`, payment);
  }

  /**
   * Get payment history for a specific order.
   * @param orderId ID of the order to fetch payment history for.
   * @returns Observable of GenericResponse containing a list of PaymentDTO objects.
   */
  getPaymentHistory(orderId: number): Observable<GenericResponse<PaymentDTO[]>> {
    return this.http.get<GenericResponse<PaymentDTO[]>>(`${this.baseUrl}/history/${orderId}`);
  }

  /**
   * Process a refund for a payment.
   * @param paymentId ID of the payment to refund.
   * @param refundAmount Amount to refund.
   * @returns Observable of GenericResponse with a success message.
   */
  processRefund(paymentId: number, refundAmount: number): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(
      `${this.baseUrl}/refund/${paymentId}`,
      refundAmount
    );
  }
}
