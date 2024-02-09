import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add-room',
  template: `
    <h2 mat-dialog-title>Add room</h2>
    <mat-dialog-content>
      <form [formGroup]="formGroup">
        <mat-form-field>
          <mat-label>Room Name</mat-label>
          <input matInput [formControl]="formGroup.controls.name" />
          @if (formGroup.controls.name.hasError('required')) {
          <mat-error>Please enter room name</mat-error>
          }
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="padding-left: 20px">
      <button mat-raised-button color="primary" (click)="addRoom()">Add</button>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  standalone: true,
})
export class AddRoomComponent {
  formGroup: FormGroup<{ name: FormControl<string | null> }> = new FormGroup({
    name: new FormControl<string | null>('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  addRoom(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.dialogRef.close(this.formGroup.controls.name.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
