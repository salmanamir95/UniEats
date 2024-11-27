export interface OrderDTO {
  orderId: number;
  userId: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  deliveryMethod: string;
  tableNumber: number;
  orderNotes: string;
}
