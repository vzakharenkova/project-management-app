export interface TaskForm {
  title: string;
  formFields: FormFields;
  submitBtn: Function;
  btnName: string;
}

export interface FormFields {
  taskSize: string;
  taskPriority: string;
  taskName?: string;
  taskDescription?: string;
}
