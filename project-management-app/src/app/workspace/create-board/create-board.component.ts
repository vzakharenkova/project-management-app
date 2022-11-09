import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  boardNameForm: FormGroup;

  formTitle: string = 'Create Board';

  boardNameErrMsg: string = 'Please enter a board name';

  constructor(public dialog: MatDialog) {
    this.boardNameForm = new FormGroup({
      boardName: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  closeTaskForm() {
    this.dialog.closeAll();
  }

  submitTaskForm() {
    if (this.boardNameForm.valid) {
      console.log(this.boardNameForm.value);
      this.dialog.closeAll();
    } else {
      console.log('Please enter a board name');
    }
  }
}
