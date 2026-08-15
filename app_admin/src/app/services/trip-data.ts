import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root',
})
export class TripData {
  private readonly apiUrl = 'http://localhost:3000/api/trips';

  constructor(private readonly http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.apiUrl}/${tripCode}`
    );
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(
      this.apiUrl,
      formData
    );
  }

  updateTrip(formData: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiUrl}/${formData.code}`,
      formData
    );
  }

  deleteTrip(tripCode: string): Observable<Trip> {
    return this.http.delete<Trip>(
      `${this.apiUrl}/${tripCode}`
    );
  }
}
