import { Component, Input, OnInit } from '@angular/core';
import {
  ColumnModel,
  TaskPriority,
  TaskSize,
  BoardModel,
  TaskModel,
} from 'src/app/workspace/board-list-page/models/board.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../../task-form/task-form.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { TaskForm } from '../../../task-form/models/task-form.models';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss', '../../drag&drop.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column: ColumnModel;

  @Input() board: BoardModel;

  public title: string;

  public columnsId: string[] = [];

  private taskFormConfig: TaskForm;

  constructor(public dialog: MatDialog) {}

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
    const selectedColumn = board.columns?.find((item) => item.title === column.title);
    board.columns?.splice(board.columns?.indexOf(<ColumnModel>selectedColumn), 1);
    this.dialog.closeAll();
  }

  public editColumnTitle(input: EventTarget | null) {
    (<HTMLInputElement>input).readOnly = !(<HTMLInputElement>input).readOnly;
  }

  openTaskForm() {
    this.taskFormConfig = {
      title: 'Create Task',
      btnName: 'Create Task',
      submitBtn: () => console.log('Создано!'),
      formFields: {
        taskSize: TaskSize.TINY,
        taskPriority: TaskPriority.HIGH,
      },
    };
    this.dialog.open(TaskFormComponent, {
      data: this.taskFormConfig,
    });
  }

  drop(event: CdkDragDrop<TaskModel[] | null>) {
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
