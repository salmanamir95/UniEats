export interface PaymentDTO {
  paymentId: number;
  orderId: number;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  paymentDate: string;
  refundAmount: number;
}
