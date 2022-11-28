import { MatSnackBarConfig } from '@angular/material/snack-bar';

const notificationConfig: MatSnackBarConfig<any> = {
  duration: 3000,
  horizontalPosition: 'end',
  verticalPosition: 'top',
};

export const notificationConfigErr: MatSnackBarConfig<any> = {
  ...notificationConfig,
  panelClass: ['err-snackbar'],
};

export const notificationConfigBasic: MatSnackBarConfig<any> = {
  ...notificationConfig,
  panelClass: ['basic-snackbar'],
};
