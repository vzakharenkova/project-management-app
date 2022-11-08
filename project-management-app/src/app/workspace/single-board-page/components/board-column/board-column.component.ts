import { Component, Input, OnInit } from '@angular/core';
import { ColumnModel, TaskPriority, TaskSize, BoardModel } from 'src/app/workspace/board-list-page/models/board.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../../task-form/task-form.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { TaskForm } from '../../../task-form/models/task-form.models';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column: ColumnModel;

  @Input() board: BoardModel;

  public title: string;

  private taskFormConfig: TaskForm;

  constructor(public dialog: MatDialog) {}

  public openDialog(e: Event) {
    e.stopPropagation();

    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Delete column',
        content: `Do you want to delete ${this.column.title} column?`,
        handler: () => this.deleteColumn(this.board, this.column),
      },
    });
  }

  public deleteColumn(board: BoardModel, column: ColumnModel) {
    const selctedColumn = board.columns?.find((item) => item.title === column.title);
    board.columns?.splice(board.columns?.indexOf(<ColumnModel>selctedColumn), 1);
    this.dialog.closeAll();
  }

  ngOnInit() {
    this.title = this.column.title;
  }

  editColumnTitle(input: EventTarget | null) {
    if (input) {
      (<HTMLInputElement>input).readOnly = !(<HTMLInputElement>input).readOnly;
    }
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
