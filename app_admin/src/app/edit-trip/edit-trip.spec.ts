import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { EditTrip } from './edit-trip';

describe('EditTrip', () => {
  let component: EditTrip;
  let fixture: ComponentFixture<EditTrip>;

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
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (key: string) => key === 'tripCode' ? 'TEST' : null,
        setItem: () => undefined,
        removeItem: () => undefined,
        clear: () => undefined,
        key: () => null,
        length: 1,
      } as Storage,
    });

    await TestBed.configureTestingModule({
      imports: [EditTrip],
      providers: [
        provideRouter([]),
        {
          provide: TripData,
          useValue: { getTrip: () => of([testTrip]) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTrip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
