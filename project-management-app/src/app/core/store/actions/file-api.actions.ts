import { createAction, props } from '@ngrx/store';

export enum FileApiActionsList {
  fileUploadError = '[FILE API] File upload error',
  fileDownloadError = '[FILE API] File download error',
}

export const fileDownloadError = createAction(
  FileApiActionsList.fileDownloadError,
  props<{ err: Error }>(),
);
