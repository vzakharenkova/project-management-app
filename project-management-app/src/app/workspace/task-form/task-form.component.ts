import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormFields, TaskForm } from './models/task-form.models';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: TaskForm, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      taskName: new FormControl(this.data.formFields.taskName, Validators.required),
      taskSize: new FormControl(this.data.formFields.taskSize),
      taskPriority: new FormControl(this.data.formFields.taskPriority),
      taskDescription: new FormControl(this.data.formFields.taskDescription, Validators.required),
    });
  }

  submitTaskForm() {
    if (this.taskForm.valid) {
      const taskData = {
        title: this.taskForm.get('taskName')?.value,
        description: this.taskForm.get('taskDescription')?.value,
      };
      this.dialog.closeAll();
      this.data.submitBtn(taskData);
    }
  }

  closeTaskForm() {
    this.dialog.closeAll();
  }

  private getFormValue(): FormFields {
    return this.taskForm.value;
  }
}
