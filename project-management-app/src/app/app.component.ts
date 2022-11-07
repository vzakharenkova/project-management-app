import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './workspace/task-form/task-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-management-app';

  constructor(private dialog: MatDialog) {
  }

  openForm() {
    this.dialog.open(TaskFormComponent)
  }
}



