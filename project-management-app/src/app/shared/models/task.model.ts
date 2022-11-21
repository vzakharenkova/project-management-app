import {
  TaskPriority,
  TaskSize,
} from 'src/app/workspace/single-board-page/models/taskConfig.model';

export interface TaskModel {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files?: FileModel[];
}

export interface TaskObjModel {
  description: string;
  priority: TaskPriority;
  size: TaskSize;
}

export interface FileModel {
  filename: string;
  fileSize: number;
}
