import { Routes } from '@angular/router';
import { guestGuard } from './guards';

export const routes: Routes = [
  {
    path: 'join',
    loadComponent: () =>
      import('./containers/join.component').then((m) => m.JoinComponent),
  },
  {
    path: 'rooms',
    canMatch: [guestGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./containers/rooms.component').then((m) => m.RoomsComponent),
      },
      {
        path: ':id',
        canMatch: [guestGuard],
        loadComponent: () =>
          import('./containers/game-container.component').then(
            (m) => m.GameContainerComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'rooms',
    pathMatch: 'full',
  },
];
