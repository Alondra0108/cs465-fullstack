import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { AuthenticationService } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  @Input() trip!: Trip;
  @Output() tripDeleted = new EventEmitter<string>();

  constructor(
    private readonly router: Router,
    private readonly tripDataService: TripData,
    public readonly auth: AuthenticationService
  ) {}

  public editTrip(trip: Trip): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['/edit-trip']);
  }

  public deleteTrip(trip: Trip): void {
    const confirmed = window.confirm(
      `Delete ${trip.name}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    this.tripDataService.deleteTrip(trip.code).subscribe({
      next: () => {
        this.tripDeleted.emit(trip.code);
      },
      error: (error) => {
        console.error(`Unable to delete trip ${trip.code}.`, error);
      },
    });
  }
}
