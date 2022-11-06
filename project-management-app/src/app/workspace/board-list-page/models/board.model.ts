export interface BoardModel {
  title: string;
  columns: ColumnModel[] | null;
}

export interface ColumnModel {
  title: string;
  tasks: TaskModel[] | null;
}

export interface TaskModel {
  title: string;
  priority: TaskPriority;
  size: TaskSize;
  description: string;
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HEIGHT = 'Height',
  URGENT = 'Urgent',
}

export enum TaskSize {
  TINY = 'Tiny',
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
  X_LARGE = 'X-large',
}
