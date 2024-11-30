import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericResponse } from '../../GenericResponse/generic-response';
import { Observable } from 'rxjs';
import { ReservationDTO } from '../../interfaces/reservation-dto';
import { Reservation } from '../../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly baseUrl= 'http://localhost:5043/api/Reservation'

  constructor(private http: HttpClient) {}

  /**
   * Check available seats.
   * @param totalTables Total number of tables in the restaurant.
   * @returns Observable of GenericResponse with a list of available table numbers.
   */
  checkAvailableSeats(totalTables: number): Observable<GenericResponse<number[]>> {
    return this.http.post<GenericResponse<number[]>>(`${this.baseUrl}/Available_Seats`, totalTables);
  }

  /**
   * Get reservations for a specific user.
   * @param userId User ID to fetch reservations for.
   * @returns Observable of GenericResponse with a list of reservations.
   */
  getUserReservations(userId: number): Observable<GenericResponse<Reservation[]>> {
    return this.http.get<GenericResponse<Reservation[]>>(`${this.baseUrl}/schedule/${userId}`);
  }

  /**
   * Make a new reservation.
   * @param reservation Reservation DTO containing details for the reservation.
   * @returns Observable of GenericResponse with the created reservation.
   */
  makeReservation(reservation: ReservationDTO): Observable<GenericResponse<Reservation>> {
    return this.http.post<GenericResponse<Reservation>>(`${this.baseUrl}/makereservation`, reservation);
  }

  /**
   * Check if a seat is occupied.
   * @param tableNumber Table number to check.
   * @param reservationDate Reservation date to check for.
   * @returns Observable of GenericResponse with a boolean indicating if the seat is occupied.
   */
  checkSeatOccupied(tableNumber: number, reservationDate: Date): Observable<GenericResponse<boolean>> {
    return this.http.get<GenericResponse<boolean>>(
      `${this.baseUrl}/checkseat/${tableNumber}/${reservationDate.toISOString()}`
    );
  }

  /**
   * Cancel a reservation.
   * @param reservationId Reservation ID to cancel.
   * @returns Observable of GenericResponse with a boolean indicating success.
   */
  cancelReservation(reservationId: number): Observable<GenericResponse<boolean>> {
    return this.http.post<GenericResponse<boolean>>(`${this.baseUrl}/cancelreservation/${reservationId}`, null);
  }
}
