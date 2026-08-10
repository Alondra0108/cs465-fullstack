import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css',
})
export class EditTrip implements OnInit {
  public editForm!: FormGroup;
  public submitted = false;
  public message = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly tripDataService: TripData,
    private readonly changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const tripCode = localStorage.getItem('tripCode');

    if (!tripCode) {
      this.router.navigate(['/']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.tripDataService.getTrip(tripCode).subscribe({
      next: (trips: Trip[]) => {
        if (!trips || trips.length === 0) {
          this.message = 'No trip retrieved.';
          return;
        }

        const trip = {
          ...trips[0],
          start: String(trips[0].start).slice(0, 10),
        };

        this.editForm.patchValue(trip);
        this.message = `Trip ${tripCode} retrieved.`;
        console.log(this.message);
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        this.message = 'Unable to retrieve trip.';
        console.error(this.message, error);
      },
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    const trip = this.editForm.getRawValue() as Trip;

    this.tripDataService.updateTrip(trip).subscribe({
      next: (updatedTrip: Trip) => {
        console.log('Trip updated:', updatedTrip);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Unable to update trip:', error);
      },
    });
  }

  public get f() {
    return this.editForm.controls;
  }
}