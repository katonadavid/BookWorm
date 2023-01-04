import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogConfig {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  title = "Are you sure?";
  message = "Do you want to perform the action?";

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogConfig) {
    this.title = data.title ?? this.title;
    this.message = data.message ?? this.message;
  }
}
