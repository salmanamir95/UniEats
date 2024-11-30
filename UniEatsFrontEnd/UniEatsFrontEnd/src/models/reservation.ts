import { User } from './user';

export interface Reservation {
  reservationId: number; // Unique identifier for the reservation
  userId: number; // ID of the user who made the reservation
  reservationDate?: Date; // Defaults to the current date
  numberOfPeople: number; // Number of people for the reservation, must be > 0
  status: 'Confirmed' | 'Canceled'; // Defaults to 'Confirmed'
  tableNumber: number; // Table number, must be > 0
  createdAt?: Date; // Defaults to the current date
  user?: User | null; // Optional navigation property for the associated user
}
