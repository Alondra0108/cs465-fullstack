import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthenticationService } from '../services/authentication';
import { TripData } from '../services/trip-data';
import { TripListing } from './trip-listing';

describe('TripListing', () => {
  let component: TripListing;
  let fixture: ComponentFixture<TripListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripListing],
      providers: [
        provideRouter([]),
        {
          provide: AuthenticationService,
          useValue: { isLoggedIn: () => false },
        },
        {
          provide: TripData,
          useValue: { getTrips: () => of([]) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TripListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
