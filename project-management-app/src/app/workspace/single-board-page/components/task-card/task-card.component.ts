import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { TaskFormComponent } from '../../../task-form/task-form.component';
import { TaskForm } from '../../../task-form/models/task-form.models';
import { ColumnModel } from 'src/app/shared/models/column.model';
import { TaskModel } from 'src/app/shared/models/task.model';
import { Store } from '@ngrx/store';
import { deleteTask, updateTask } from 'src/app/core/store/actions/task.actions';
import { TranslocoService } from '@ngneat/transloco';

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

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private transloco: TranslocoService,
  ) {}

  public openConfirmationDialog(e: Event) {
    e.stopPropagation();

    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: this.transloco.translateObject('dialogDelTask.title'),
        content: this.transloco.translateObject('dialogDelTask.content', {
          name: this.task.title,
        }),
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

  openTaskForm() {
    this.taskFormConfig = {
      title: this.transloco.translateObject('form.editTask.title'),
      btnName: this.transloco.translateObject('form.editTask.createTaskBtn'),
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
    this.dialog.open(TaskFormComponent, {
      data: this.taskFormConfig,
    });
  }
}
