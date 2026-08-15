import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication';
import { TripData } from '../services/trip-data';
import { TripCard } from './trip-card';

describe('TripCard', () => {
  let component: TripCard;
  let fixture: ComponentFixture<TripCard>;

  const testTrip: Trip = {
    code: 'TEST',
    name: 'Test Trip',
    length: '2 nights / 3 days',
    start: '2026-08-15',
    resort: 'Test Resort',
    perPerson: '500',
    image: 'reef1.jpg',
    description: 'Test description',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCard],
      providers: [
        provideRouter([]),
        {
          provide: AuthenticationService,
          useValue: { isLoggedIn: () => true },
        },
        {
          provide: TripData,
          useValue: { deleteTrip: () => of(testTrip) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TripCard);
    component = fixture.componentInstance;
    component.trip = testTrip;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
