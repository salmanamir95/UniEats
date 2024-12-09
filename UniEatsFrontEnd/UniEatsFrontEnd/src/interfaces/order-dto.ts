// interfaces/order-dto.ts
export interface OrderDTO {
  orderId: number;
  userId: number;
  orderDate: string; // Expecting string (ISO format)
  totalAmount: number;
  status: string;
  paymentMethod: string;
  deliveryMethod: string;
  tableNumber: number;
  orderNotes: string;
}
