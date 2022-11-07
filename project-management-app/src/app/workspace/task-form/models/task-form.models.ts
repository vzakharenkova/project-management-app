export interface TaskForm {
  title: string;
  formFields: FormFields;
  submitBtn: string;
  btnName: string;
}

export interface FormFields {
  taskName: string;
  taskSize: string;
  taskPriority: string;
  taskDescription: string;
}
