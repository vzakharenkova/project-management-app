import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { FileService } from 'src/app/core/services/file.service';
import { fileDownloadError } from 'src/app/core/store/actions/file-api.actions';
import { TaskModel, TaskObjModel } from 'src/app/shared/models/task.model';
import { TaskForm } from 'src/app/workspace/task-form/models/task-form.models';
import { TaskFormComponent } from 'src/app/workspace/task-form/task-form.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  public taskDescription: TaskObjModel;

  public filesUrl: SafeResourceUrl[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskModel; config: TaskForm },
    private dialog: MatDialog,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.data.task.files = this.data.task.files?.sort(
      (file1, file2) => file1.fileSize - file2.fileSize,
    );
    this.taskDescription = <TaskObjModel>JSON.parse(this.data.task.description);
    this.makeFileUrl(this.data);
  }

  public openTaskForm() {
    this.dialog.closeAll();
    this.dialog.open(TaskFormComponent, {
      data: this.data.config,
    });
  }

  public closeTask() {
    this.dialog.closeAll();
  }

  public nameHandler(name: string): string {
    const maxLength = 15;
    if (name.length > maxLength) {
      const ext = name.slice(name.lastIndexOf('.'), name.length);
      return name.slice(0, maxLength) + '...' + ext;
    } else return name;
  }

  private makeFileUrl(data: { task: TaskModel; config: TaskForm }): void {
    if (data.task.files?.length) {
      data.task.files?.forEach((file) => {
        this.downloadFile(file.filename);
      });
    }
  }

  private downloadFile(fileName: string) {
    this.fileService
      .downloadFile(this.data.task.id, fileName)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          const blob: Blob = new Blob([res.body as Blob], { type: 'image/jpeg' });
          this.filesUrl.push(
            this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob)),
          );
        },
        error: (err) => fileDownloadError(err),
      });
  }
}
