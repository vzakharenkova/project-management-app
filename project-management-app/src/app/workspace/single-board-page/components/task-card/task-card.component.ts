import { Component, Input } from '@angular/core';
import { TaskModel } from 'src/app/workspace/board-list-page/models/board.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../../task-form/task-form.component';
import { TaskForm } from '../../../task-form/models/task-form.models';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task: TaskModel;

  private taskFormConfig: TaskForm;

  constructor(private dialog: MatDialog) {
  }

  openTaskForm() {
    this.taskFormConfig = {
      title: 'Edite Task',
      btnName: 'Edit Task',
      submitBtn: () => console.log('Отредактировано!'),
      formFields: {
        taskName: this.task.title,
        taskSize: this.task.size,
        taskPriority: this.task.priority,
        taskDescription: this.task.description
      }
    };
    this.dialog.open(TaskFormComponent, {
      data: this.taskFormConfig,
    })
  }
}
