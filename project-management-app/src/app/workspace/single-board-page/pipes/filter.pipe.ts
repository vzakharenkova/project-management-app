import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from 'src/app/shared/models/task.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(tasks: TaskModel[], filterTerm: string): TaskModel[] {
    if (tasks && tasks.length > 0 && filterTerm.length) {
      return tasks.filter(
        (task) =>
          task.title.includes(filterTerm.toLowerCase()) ||
          task.description.includes(filterTerm.toLowerCase()),
      );
    }

    return tasks;
  }
}
