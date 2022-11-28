import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslocoService } from '@ngneat/transloco';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { TaskFormComponent } from '../../../task-form/task-form.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { TaskForm } from '../../../task-form/models/task-form.models';
import { ColumnModel } from '../../../../shared/models/column.model';
import { BoardModel } from '../../../../shared/models/board.model';
import { TaskModel } from '../../../../shared/models/task.model';
import { deleteColumn, updateColumn } from '../../../../core/store/actions/column.actions';
import { createTask, updateTask } from '../../../../core/store/actions/task.actions';
import { StateModel } from '../../../../core/store/state/state.model';
import { AuthDataModel, UserModel } from '../../../../shared/models/user.model';
import { calculateOrder } from '../../../../shared/utils/calculateOrder';
import { FileHandle } from 'src/app/workspace/task-form/directives/dragDropFiles.directive';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss', '../../drag&drop.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column: ColumnModel;

  @Input() board: BoardModel;

  @Input() users: UserModel[] | null;

  @Input() user: AuthDataModel | null;

  public title: string;

  public columnsId: string[] = [];

  private dragItems: TaskModel[] = [];

  private taskFormConfig: TaskForm;

  private userId: string;

  constructor(
    public dialog: MatDialog,
    private store: Store<StateModel>,
    private transloco: TranslocoService,
  ) {}

  ngOnInit() {
    this.column.tasks?.sort((task_1, task_2) => task_1.order - task_2.order);
    this.title = this.column.title;
    this.board.columns!.forEach((item) => this.columnsId.push(item.id));
  }

  public openConfirmationDialog(e: Event) {
    e.stopPropagation();

    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: this.transloco.translateObject('dialogDelColumn.title'),
        content: this.transloco.translateObject('dialogDelColumn.content', {
          name: this.column.title,
        }),
        handler: () => this.deleteColumn(this.board, this.column),
      },
    });
  }

  public openEditColumnTitle(input: EventTarget | null) {
    (<HTMLInputElement>input).value = this.title;
    (<HTMLInputElement>input).readOnly = false;
  }

  public closeEditColumnTitle(input: EventTarget | null) {
    (<HTMLInputElement>input).readOnly = true;
    if (!this.title.length || this.title === this.column.title) {
      this.title = this.column.title;
      return;
    }
    this.store.dispatch(
      updateColumn({
        boardId: this.board.id,
        columnId: this.column.id,
        data: { title: this.title, order: this.column.order },
      }),
    );
  }

  public openTaskForm() {
    this.userId = <string>this.users?.find((user) => this.user?.login === user.login)?.id;
    this.taskFormConfig = {
      title: this.transloco.translateObject('form.createTask.title'),
      btnName: this.transloco.translateObject('form.createTask.createTaskBtn'),
      submitBtn: (data: { title: string; description: string }, files: FileHandle[]) =>
        this.store.dispatch(
          createTask({
            boardId: this.board.id,
            columnId: this.column.id,
            data: { ...data, userId: this.userId },
            files,
          }),
        ),
      formFields: {
        taskSize: 'Small',
        taskPriority: 'Low',
      },
    };
    this.dialog.open(TaskFormComponent, {
      data: this.taskFormConfig,
    });
  }

  public drop(event: CdkDragDrop<TaskModel[] | undefined>) {
    if (event.previousContainer === event.container) {
      copyArrayItem(event.container.data!, this.dragItems, event.previousIndex, 0);
      moveItemInArray(event.container.data!, event.previousIndex, event.currentIndex);
      this.store.dispatch(updateTask(this.createPropsUpdTask(event, event.container.id)));
    } else {
      copyArrayItem(event.previousContainer.data!, this.dragItems, event.previousIndex, 0);
      transferArrayItem(
        event.previousContainer.data!,
        event.container.data!,
        event.previousIndex,
        event.currentIndex,
      );
      this.store.dispatch(updateTask(this.createPropsUpdTask(event, event.previousContainer.id)));
    }
  }

  private createPropsUpdTask(
    event: CdkDragDrop<TaskModel[] | undefined>,
    columnIdForUpd: string,
  ): {
    boardId: string;
    columnId: string;
    taskId: string;
    data: Omit<TaskModel, 'id'>;
  } {
    return {
      boardId: this.board.id,
      columnId: columnIdForUpd,
      taskId: this.dragItems[0].id,
      data: {
        boardId: this.board.id,
        userId: this.dragItems[0].userId,
        columnId: event.container.id,
        title: this.dragItems[0].title,
        order: calculateOrder(event),
        description: this.dragItems[0].description,
      },
    };
  }

  private deleteColumn(board: BoardModel, column: ColumnModel) {
    this.store.dispatch(deleteColumn({ boardId: board.id, columnId: column.id }));
    this.dialog.closeAll();
  }

  public changeTitle(titleInput: EventTarget | null) {
    this.title = (<HTMLInputElement>titleInput).value;
  }
}
