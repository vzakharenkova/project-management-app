import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../../task-form/task-form.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { TaskForm } from '../../../task-form/models/task-form.models';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnModel } from 'src/app/shared/models/column.model';
import { BoardModel } from 'src/app/shared/models/board.model';
import { TaskModel } from 'src/app/shared/models/task.model';
import { Store } from '@ngrx/store';
import { deleteColumn } from 'src/app/core/store/actions/column.actions';
import { createTask } from 'src/app/core/store/actions/task.actions';
import { StateModel } from 'src/app/core/store/state/state.model';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss', '../../drag&drop.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column: ColumnModel;

  @Input() board: BoardModel;

  @Input() users: UserModel[] | null;

  @Input() userLogin: string | null;

  public title: string;

  public columnsId: string[] = [];

  private taskFormConfig: TaskForm;

  private userId: string;

  constructor(public dialog: MatDialog, private store: Store<StateModel>) {}

  ngOnInit() {
    this.title = this.column.title;
    this.board.columns!.forEach((item) => this.columnsId.push(item.id));
  }

  public openConfirmationDialog(e: Event) {
    e.stopPropagation();

    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Delete column',
        content: `Do you want to delete ${this.column.title} column?`,
        handler: () => this.deleteColumn(this.board, this.column),
      },
    });
  }

  private deleteColumn(board: BoardModel, column: ColumnModel) {
    this.store.dispatch(deleteColumn({ boardId: board.id, columnId: column.id }));
    this.dialog.closeAll();
  }

  public editColumnTitle(input: EventTarget | null) {
    (<HTMLInputElement>input).readOnly = !(<HTMLInputElement>input).readOnly;
  }

  openTaskForm() {
    this.userId = <string>this.users?.find((user) => this.userLogin === user.login)?.id;
    this.taskFormConfig = {
      title: 'Create Task',
      btnName: 'Create Task',
      submitBtn: (data: { title: string; description: string }) =>
        this.store.dispatch(
          createTask({
            boardId: this.board.id,
            columnId: this.column.id,
            data: { ...data, userId: this.userId },
          }),
        ),
      formFields: {
        taskSize: 'Small',
        taskPriority: 'High',
      },
    };
    this.dialog.open(TaskFormComponent, {
      data: this.taskFormConfig,
    });
  }

  drop(event: CdkDragDrop<TaskModel[] | undefined>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data!, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data!,
        event.container.data!,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
