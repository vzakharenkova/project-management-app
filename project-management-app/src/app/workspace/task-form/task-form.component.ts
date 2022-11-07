import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormFields } from './models/task-form.models';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;

  taskNameErrMsg: string = 'Please enter a task name';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      taskName: new FormControl('', Validators.required),
      taskSize: new FormControl('small'),
      taskPriority: new FormControl('high'),
      taskDescription: new FormControl(),
    });
  }

  submitTaskForm() {
    let formValue: FormFields;
    if (this.taskForm.valid) {
      formValue = this.getFormValue();
      this.dialog.closeAll();
      console.log(formValue);
    } else {
      console.log('Заполните название задачи');
    }
  }

  closeTaskForm() {
    this.dialog.closeAll();
  }

  private getFormValue(): FormFields {
    return this.taskForm.value;
  }
}
