import { Component, Input } from '@angular/core';
import { TaskModel } from 'src/app/workspace/board-list-page/models/board.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../../task-form/task-form.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task: TaskModel;

  constructor(private dialog: MatDialog) {
  }

  openTaskForm() {
    this.dialog.open(TaskFormComponent)
  }
}
