import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

export interface TaskForm {
  title: string;
  formFields: FormFields;
  submitBtn: string;
  btnName: string;
}

export interface FormFields {
  taskName: string;
  taskSize: string;
  taskPriority: string;
  taskDescription: string;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;

  redBorder = { border: 'red 1px solid' };

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      taskName: new FormControl('', Validators.required),
      taskSize: new FormControl('small'),
      taskPriority: new FormControl('high'),
      taskDescription: new FormControl(),
    });
  }

  submit() {
    let formValue: FormFields;
    if (this.taskForm.valid) {
      formValue = this.getFormValue();
      this.dialog.closeAll();
      console.log(formValue);
    } else {
      console.log('Заполните название задачи');
    }
  }

  closeForm() {
    this.dialog.closeAll();
  }

  addWarningStyle(target: AbstractControl<any, any> | null): {} {
    return target?.invalid && (target?.touched || target?.dirty) ? this.redBorder : {};
  }

  private getFormValue(): FormFields {
    return {
      taskName: this.taskForm.controls['taskName'].value,
      taskSize: this.taskForm.controls['taskSize'].value,
      taskPriority: this.taskForm.controls['taskPriority'].value,
      taskDescription: this.taskForm.controls['taskDescription'].value,
    }
  }
}
