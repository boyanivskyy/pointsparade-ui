import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services';

const imports = [
  CommonModule,
  ReactiveFormsModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
];

@Component({
  selector: 'app-join',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title style="margin-bottom: 20px"
          >Please add your name to play</mat-card-title
        >
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="formGroup" (ngSubmit)="onSubmit($event)">
          <mat-form-field>
            <input
              matInput
              type="text"
              [formControl]="formGroup.controls.name"
            />
            @if (formGroup.controls.name.hasError('required')) {
            <mat-error>Please enter your name</mat-error>
            }
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          (click)="onSubmit($event)"
        >
          Join
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  imports,
  standalone: true,
})
export class JoinComponent implements OnInit {
  formGroup!: FormGroup<{ name: FormControl }>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(event: Event) {
    if (this.formGroup.invalid) {
      return;
    }

    this.userService.setUser(this.formGroup.controls.name.value);
    this.formGroup.controls.name.reset();
  }

  private buildForm() {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }
}
