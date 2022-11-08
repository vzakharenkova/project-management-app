import { Component, Input } from '@angular/core';
import { ColumnModel, TaskPriority, TaskSize } from 'src/app/workspace/board-list-page/models/board.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../../task-form/task-form.component';
import { TaskForm } from '../../../task-form/models/task-form.models';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  @Input() column: ColumnModel;

  private taskFormConfig: TaskForm;

  constructor(private dialog: MatDialog) {
  }

  openTaskForm() {
    this.taskFormConfig = {
      title: 'Create Task',
      btnName: 'Create Task',
      submitBtn: () => console.log('Создано!'),
      formFields: {
        taskSize: TaskSize.TINY,
        taskPriority: TaskPriority.HIGH,
      }
    };
    this.dialog.open(TaskFormComponent, {
      data: this.taskFormConfig,
    });
  }
}
