import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Observable, filter } from 'rxjs';
import { AddRoomComponent } from '../components';
import { Room } from '../models';
import { RoomService } from '../services';
import { Router } from '@angular/router';

const imports = [
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  MatButtonModule,
  MatTableModule,
];

@Component({
  selector: 'app-rooms',
  template: `
    <div
      style="display: flex; width: 100%; justify-content: space-between; margin: 20px 0"
    >
      <h2>Rooms</h2>
      <button mat-raised-button color="primary" (click)="addRoom()">
        Add Room
      </button>
    </div>
    <table
      mat-table
      [dataSource]="(rooms$ | async) || []"
      class="mat-elevation-z8"
    >
      <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let room">{{ room.name }}</td>
      </ng-container>

      <ng-container matColumnDef="guests">
        <th mat-header-cell *matHeaderCellDef>Guests</th>
        <td mat-cell *matCellDef="let room">{{ room.guests?.length || 0 }}</td>
      </ng-container>

      <ng-container matColumnDef="createdAt">
        <th mat-header-cell *matHeaderCellDef>Created At</th>
        <td mat-cell *matCellDef="let room">
          {{ room.createdAt | date }}
        </td>
      </ng-container>

      <ng-container matColumnDef="join">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let room">
          <button mat-raised-button color="secondary">Join</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr
        mat-row
        *matRowDef="let row; columns: displayedColumns"
        (click)="joinRoom(row.id)"
      ></tr>
    </table>
  `,
  styles: `
    tr {
      cursor: pointer;

      &:hover {
        .cdk-column-join button {
          visibility: visible;
        }
      }
    }

    .cdk-column-join {
      width: 80px;

      button {
        visibility: hidden;
      }
    }
  `,
  imports,
  standalone: true,
})
export class RoomsComponent {
  readonly rooms$: Observable<Room[]> = this.roomService.rooms$.asObservable();
  readonly displayedColumns = ['name', 'guests', 'createdAt', 'join'];

  constructor(
    private roomService: RoomService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  addRoom(): void {
    const dialogRef = this.dialog.open(AddRoomComponent);

    dialogRef
      .afterClosed()
      .pipe(filter((name) => !!name))
      .subscribe((name) => {
        console.log('hello');
        this.roomService.addRoom(name);
      });
  }

  joinRoom(id: string): void {
    this.router.navigate(['rooms', id]);
    console.log('Join Room', id);
  }
}
