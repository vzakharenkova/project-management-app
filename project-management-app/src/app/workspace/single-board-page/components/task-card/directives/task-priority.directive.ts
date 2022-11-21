import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { TaskModel, TaskObjModel } from 'src/app/shared/models/task.model';
import { TaskPriority } from '../../../models/taskConfig.model';

enum PriorityClass {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Directive({
  selector: '[appTaskPriority]',
})
export class TaskPriorityDirective implements OnInit {
  @Input() task: TaskModel;

  taskPriority: string;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.taskPriority = (<TaskObjModel>JSON.parse(this.task.description)).priority;
    this.renderer.addClass(this.elementRef.nativeElement, this.getClass());
  }

  private getClass() {
    switch (this.taskPriority) {
      case TaskPriority.LOW: {
        return PriorityClass.LOW;
      }
      case TaskPriority.MEDIUM: {
        return PriorityClass.MEDIUM;
      }
      case TaskPriority.HIGH: {
        return PriorityClass.HIGH;
      }
      case TaskPriority.URGENT: {
        return PriorityClass.URGENT;
      }
      default: {
        return '';
      }
    }
  }
}
