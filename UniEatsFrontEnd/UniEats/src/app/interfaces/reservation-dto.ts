// import { User } from './user.model';

export interface ReservationDTO {
  userId: number; // Required
  reservationDate?: Date; // Defaults to the current date
  numberOfPeople: number; // Required, must be greater than 0
  status: 'Confirmed' | 'Canceled'; // Defaults to 'Confirmed', specific values only
  tableNumber: number; // Required, must be greater than 0
  createdAt?: Date; // Defaults to the current date
  // user?: User | null; // Optional (navigation property)
}
