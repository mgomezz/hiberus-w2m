import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageNotificationService {
  duration = 5000;
  action = 'X';
  constructor(private snackBar: MatSnackBar) {}

  notifySuccess(message: string): void {
    this.snackBar.open(message, this.action, {
      duration: this.duration,
      panelClass: 'snackbar-success',
    });
  }

  notifyInfo(message: string): void {
    this.snackBar.open(message, this.action, {
      duration: this.duration,
    });
  }

  notifyError(error: string): void {
    this.snackBar.open(error, this.action, {
      duration: this.duration,
      panelClass: 'snackbar-danger',
    });
  }
}
