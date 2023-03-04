import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateModel } from 'src/app/core/store/state/state.model';
import { Store } from '@ngrx/store';
import { createColumn } from 'src/app/core/store/actions/column.actions';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
})
export class CreateColumnComponent {
  public columnForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { boardId: string },
    public dialog: MatDialog,
    private store: Store<StateModel>,
  ) {
    this.columnForm = new FormGroup({
      columnName: new FormControl('', Validators.required),
    });
  }

  public closeColumnForm() {
    this.dialog.closeAll();
  }

  submitCreateColumnForm() {
    if (this.columnForm.valid) {
      this.store.dispatch(
        createColumn({
          boardId: this.data.boardId,
          data: {
            title: this.columnForm.get('columnName')?.value,
          },
        }),
      );
      this.dialog.closeAll();
    }
  }
}
