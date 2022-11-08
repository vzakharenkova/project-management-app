import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { ColumnModel, TaskModel } from 'src/app/workspace/board-list-page/models/board.model';
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

  @Input() column: ColumnModel;

  constructor(public dialog: MatDialog) {}

  public openConfirmationDialog(e: Event) {
    e.stopPropagation();

    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Delete task',
        content: `Do you want to delete ${this.task.title} task?`,
        handler: () => this.deleteTask(this.column, this.task),
      },
    });
  }

  private deleteTask(column: ColumnModel, task: TaskModel) {
    const selctedTask = column?.tasks?.find((item) => item.title === task.title);
    column.tasks?.splice(column.tasks?.indexOf(<TaskModel>selctedTask), 1);
    this.dialog.closeAll();
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
