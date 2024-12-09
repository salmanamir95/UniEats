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

  private readonly baseUrl = 'http://localhost:5043/api/Reservation';

  constructor(private http: HttpClient) {}

  /**
   * Check available seats.
   * @param totalTables Total number of tables in the restaurant.
   */
  checkAvailableSeats(totalTables: number): Observable<GenericResponse<number[]>> {
    return this.http.post<GenericResponse<number[]>>(`${this.baseUrl}/Available_Seats`, totalTables);
  }

  /**
   * Fetch all reservations for a specific user.
   */
  getUserReservations(userId: number): Observable<GenericResponse<Reservation[]>> {
    return this.http.get<GenericResponse<Reservation[]>>(`${this.baseUrl}/schedule/${userId}`);
  }

  /**
   * Handle reservation creation by mapping multiple tables into a single reservation call.
   */
  makeReservation(reservationDTO: ReservationDTO): Observable<GenericResponse<Reservation>> {
    const mappedReservation = {
      userId: reservationDTO.userId,
      reservationDate: reservationDTO.reservationDate,
      numberOfPeople: reservationDTO.numberOfPeople,
      status: reservationDTO.status,
      tableNumber: reservationDTO.tables[0], // Send only the first table number for now
      createdAt: new Date()
    };

    return this.http.post<GenericResponse<Reservation>>(`${this.baseUrl}/makereservation`, mappedReservation);
  }

  /**
   * Check if a seat is occupied by mapping multiple checks to `checkseat`.
   */
  checkSeatOccupied(tableNumber: number, reservationDate: Date): Observable<GenericResponse<boolean>> {
    return this.http.get<GenericResponse<boolean>>(
      `${this.baseUrl}/checkseat/${tableNumber}/${reservationDate.toISOString()}`
    );
  }

  /**
   * Allow cancellation of a reservation.
   */
  cancelReservation(reservationId: number): Observable<GenericResponse<boolean>> {
    return this.http.post<GenericResponse<boolean>>(
      `${this.baseUrl}/cancelreservation/${reservationId}`,
      null
    );
  }
}
