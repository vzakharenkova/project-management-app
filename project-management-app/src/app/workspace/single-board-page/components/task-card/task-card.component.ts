import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { TaskFormComponent } from '../../../task-form/task-form.component';
import { TaskForm } from '../../../task-form/models/task-form.models';
import { ColumnModel } from 'src/app/shared/models/column.model';
import { TaskModel } from 'src/app/shared/models/task.model';
import { Store } from '@ngrx/store';
import { deleteTask, updateTask } from 'src/app/core/store/actions/task.actions';
import { TaskModalComponent } from './components/task-modal/task-modal.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task: TaskModel;

  @Input() column: ColumnModel;

  @Input() boardId: string;

  private taskFormConfig: TaskForm;

  constructor(public dialog: MatDialog, private store: Store) {}

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
    this.store.dispatch(
      deleteTask({
        boardId: this.boardId,
        columnId: column.id,
        taskId: task.id,
      }),
    );
    this.dialog.closeAll();
  }

  private createTaskConfig() {
    return {
      title: 'Edite Task',
      btnName: 'Edit Task',
      submitBtn: (data: { title: string; description: string }) =>
        this.store.dispatch(
          updateTask({
            boardId: this.boardId,
            columnId: this.column.id,
            taskId: this.task.id,
            data: {
              ...data,
              boardId: this.boardId,
              columnId: this.column.id,
              order: this.task.order,
              userId: this.task.userId,
            },
          }),
        ),
      formFields: {
        taskName: this.task.title,
        taskSize: 'Small',
        taskPriority: 'High',
        taskDescription: this.task.description,
      },
    };
  }

  openTaskForm(e: Event) {
    e.stopPropagation();
    this.taskFormConfig = this.createTaskConfig();
    this.dialog.open(TaskFormComponent, {
      data: this.taskFormConfig,
    });
  }

  openTask() {
    const taskProps = {
      task: this.task,
      config: this.createTaskConfig(),
    };
    this.dialog.open(TaskModalComponent, {
      data: taskProps,
    });
  }
}
