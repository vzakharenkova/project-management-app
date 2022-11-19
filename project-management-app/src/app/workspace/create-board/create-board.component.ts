import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateModel } from 'src/app/core/store/state/state.model';
import { Store } from '@ngrx/store';
import { createBoard } from 'src/app/core/store/actions/board.actions';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent {
  boardForm: FormGroup;

  constructor(public dialog: MatDialog, private store: Store<StateModel>) {
    this.boardForm = new FormGroup({
      boardName: new FormControl('', Validators.required),
      boardDescription: new FormControl('', Validators.required),
    });
  }

  closeBoardForm() {
    this.dialog.closeAll();
  }

  submitCreateBoardForm() {
    if (this.boardForm.valid) {
      this.store.dispatch(
        createBoard({
          data: {
            title: this.boardForm.get('boardName')?.value,
            description: this.boardForm.get('boardDescription')?.value,
          },
        }),
      );
      this.dialog.closeAll();
    }
  }
}
