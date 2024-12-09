export interface ReservationDTO {
  userId: number; // Required
  reservationDate: Date; // Required
  tables: number[]; // List of table numbers being reserved
  numberOfPeople: number; // Required
  status: 'Confirmed' | 'Canceled'; // Defaults to 'Confirmed'
  createdAt?: Date; // Optional
}
