import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TaskModel, TaskObjModel } from 'src/app/shared/models/task.model';
import { TaskForm } from 'src/app/workspace/task-form/models/task-form.models';
import { TaskFormComponent } from 'src/app/workspace/task-form/task-form.component';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  public taskDescription: TaskObjModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskModel; config: TaskForm },
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.taskDescription = <TaskObjModel>JSON.parse(this.data.task.description);
  }

  openTaskForm() {
    this.dialog.closeAll();
    this.dialog.open(TaskFormComponent, {
      data: this.data.config,
    });
  }

  closeTask() {
    this.dialog.closeAll();
  }

  nameHandler(name: string): string {
    const maxLength = 15;
    if (name.length > maxLength) {
      const ext = name.slice(name.lastIndexOf('.'), name.length);
      return name.slice(0, maxLength) + '...' + ext;
    } else return name;
  }

  downloadFile(fileName: string) {
    console.log(fileName, this.data);
    let blob = new Blob([]);
  }
}
