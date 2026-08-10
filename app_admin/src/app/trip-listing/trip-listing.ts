import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  message = '';

  constructor(
    private readonly tripDataService: TripData,
    private readonly router: Router,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  public addTrip(): void {
    this.router.navigate(['/add-trip']);
  }

  private getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (trips: Trip[]) => {
        this.trips = trips;

        if (trips.length > 0) {
          this.message = `There are ${trips.length} trips available.`;
        } else {
          this.message = 'There were no trips retrieved from the database.';
        }

        console.log(this.message);
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        this.message = 'Unable to retrieve trips from the database.';
        console.error(this.message, error);
        this.changeDetector.detectChanges();
      },
    });
  }

  ngOnInit(): void {
    this.getTrips();
  }
}