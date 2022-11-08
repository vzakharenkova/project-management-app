import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormFields, TaskForm } from './models/task-form.models';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  taskNameErrMsg: string = 'Please enter a task name';

  constructor(@Inject(MAT_DIALOG_DATA) public data: TaskForm, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      taskName: new FormControl(this.data.formFields.taskName, Validators.required),
      taskSize: new FormControl(this.data.formFields.taskSize),
      taskPriority: new FormControl(this.data.formFields.taskPriority),
      taskDescription: new FormControl(this.data.formFields.taskDescription),
    });
  }

  submitTaskForm() {
    let formValue: FormFields;
    if (this.taskForm.valid) {
      formValue = this.getFormValue();
      this.dialog.closeAll();
      this.data.submitBtn();
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
