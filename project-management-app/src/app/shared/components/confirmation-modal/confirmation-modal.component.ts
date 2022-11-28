import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string; handler: Function },
    public dialog: MatDialog,
  ) {}
}
