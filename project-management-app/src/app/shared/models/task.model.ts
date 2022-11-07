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

export interface FileModel {
  filename: string;
  fileSize: number;
}
