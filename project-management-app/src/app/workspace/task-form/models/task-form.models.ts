import { TaskPriority, TaskSize } from '../../board-list-page/models/board.model';

export interface TaskForm {
  title: string;
  formFields: FormFields;
  submitBtn: Function;
  btnName: string;
}

export interface FormFields {
  taskSize: TaskSize;
  taskPriority: TaskPriority;
  taskName?: string;
  taskDescription?: string;
}
