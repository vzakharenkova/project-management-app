import { TaskModel } from './task.model';

export interface ColumnModel {
  id: string;
  title: string;
  order: number;
  tasks?: TaskModel[];
}
