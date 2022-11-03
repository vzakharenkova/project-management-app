import { Component } from '@angular/core';
import { TaskFormComponent } from './task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-management-app';

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(TaskFormComponent);
  }
}



