import { createAction, props } from '@ngrx/store';
import { FileHandle } from 'src/app/workspace/task-form/directives/dragDropFiles.directive';

export enum FileApiActionsList {
  fileUpload = '[FILE API] File upload',
  fileUploadError = '[FILE API] File upload error',
  fileDownloadError = '[FILE API] File download error',
}

export const fileDownloadError = createAction(
  FileApiActionsList.fileDownloadError,
  props<{ err: Error }>(),
);

export const fileUpload = createAction(
  FileApiActionsList.fileUpload,
  props<{ taskid: string; files: FileHandle[] }>(),
);
