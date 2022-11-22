import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TaskForm } from './models/task-form.models';
import { FileHandle } from './directives/dragDropFiles.directive';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  selectedFiles: FileHandle[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskForm,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private fileService: FileService,
  ) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      taskName: new FormControl(this.data.formFields.taskName, Validators.required),
      taskSize: new FormControl(this.data.formFields.taskSize),
      taskPriority: new FormControl(this.data.formFields.taskPriority),
      taskDescription: new FormControl(this.data.formFields.taskDescription, Validators.required),
      taskFile: new FormControl(),
    });
  }

  submitTaskForm() {
    if (this.taskForm.valid) {
      const taskData = {
        title: this.taskForm.get('taskName')?.value,
        description: JSON.stringify({
          description: this.taskForm.get('taskDescription')?.value,
          size: this.taskForm.get('taskSize')?.value,
          priority: this.taskForm.get('taskPriority')?.value,
        }),
      };
      this.dialog.closeAll();
      this.data.submitBtn(taskData, this.selectedFiles);
    }
  }

  closeTaskForm() {
    this.dialog.closeAll();
  }

  dropFile(event: FileHandle[]) {
    this.selectedFiles = event;
  }

  fn() {}

  btnUploadFile(event: Event) {
    const files: FileHandle[] = [];
    for (let i = 0; i < (event.target! as HTMLInputElement).files!.length; i++) {
      const file = (event.target! as HTMLInputElement).files![i];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      files.push({ file, url });
    }
    if (files.length > 0) {
      this.selectedFiles = files;
    }
  }
}
