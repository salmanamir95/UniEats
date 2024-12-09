export interface ReservationDTO {
  userId: number; // Required
  reservationDate: Date; // Required, representing the current reservation date
  tables: number[]; // List of table numbers being reserved
  numberOfPeople: number; // Required, how many people are part of this reservation
  status: 'Confirmed' | 'Canceled'; // Defaults to 'Confirmed'
  tableNumber?: number; // Optional table number property if only a single table is being reserved
  createdAt?: Date; // Defaults to the current date
}
