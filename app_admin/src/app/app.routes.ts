import { Routes } from '@angular/router';

import { AddTrip } from './add-trip/add-trip';
import { EditTrip } from './edit-trip/edit-trip';
import { TripListing } from './trip-listing/trip-listing';
import { Login } from './login/login';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'add-trip',
    component: AddTrip,
    canActivate: [authGuard],
  },
  {
    path: 'edit-trip',
    component: EditTrip,
    canActivate: [authGuard],
  },
  {
    path: '',
    component: TripListing,
    pathMatch: 'full',
  },
];
