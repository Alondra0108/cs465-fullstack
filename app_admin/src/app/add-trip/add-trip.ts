import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-add-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css',
})
export class AddTrip implements OnInit {
  public addForm!: FormGroup;
  public submitted = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly tripService: TripData
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    const newTrip = this.addForm.getRawValue() as Trip;

    this.tripService.addTrip(newTrip).subscribe({
      next: (trip: Trip) => {
        console.log('Trip added:', trip);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Unable to add trip:', error);
      },
    });
  }

  public get f() {
    return this.addForm.controls;
  }
}