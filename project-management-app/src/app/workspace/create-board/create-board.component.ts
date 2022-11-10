import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  boardForm: FormGroup;

  formTitle: string = 'Create Board';

  boardNameErrMsg: string = 'Please enter a board name';

  constructor(public dialog: MatDialog) {
    this.boardForm = new FormGroup({
      boardName: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  closeBoardForm() {
    this.dialog.closeAll();
  }

  submitCreateBoardForm() {
    if (this.boardForm.valid) {
      console.log(this.boardForm.value);
      this.dialog.closeAll();
    } else {
      console.log('Please enter a board name');
    }
  }
}
