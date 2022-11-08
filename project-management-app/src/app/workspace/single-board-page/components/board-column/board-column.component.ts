import { Component, Input } from '@angular/core';
import { ColumnModel } from 'src/app/workspace/board-list-page/models/board.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../../task-form/task-form.component';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  @Input() column: ColumnModel;

  constructor(private dialog: MatDialog) {
  }

  openTaskForm() {
    this.dialog.open(TaskFormComponent);
  }
}
