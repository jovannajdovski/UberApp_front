import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  title = "";
  message = "";
  warning = false;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, warning: boolean },
  ) {
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
    this.warning = this.data.warning;
  }

  confirm() {
    this.dialogRef.close("success")
  }

  cancel() {
    this.dialogRef.close()
  }
}
