import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskModel } from 'src/app/shared/models/task.model';
import { TaskForm } from 'src/app/workspace/task-form/models/task-form.models';
import { TaskFormComponent } from 'src/app/workspace/task-form/task-form.component';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskModel; config: TaskForm },
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  openTaskForm() {
    this.dialog.closeAll();
    this.dialog.open(TaskFormComponent, {
      data: this.data.config,
    });
  }

  closeTask() {
    this.dialog.closeAll();
  }
}
