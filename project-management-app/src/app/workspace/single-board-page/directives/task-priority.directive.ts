import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { TaskModel, TaskPriority } from 'src/app/workspace/board-list-page/models/board.model';

enum PriorityClass {
  LOW = 'low',
  MEDIUM = 'medium',
  HEIGH = 'heigh',
  URGENT = 'urgent',
}

@Directive({
  selector: '[appTaskPriority]',
})
export class TaskPriorityDirective implements OnInit {
  @Input() task!: TaskModel;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, this.getClass());
  }

  private getClass() {
    switch (this.task.priority) {
      case TaskPriority.LOW: {
        return PriorityClass.LOW;
      }
      case TaskPriority.MEDIUM: {
        return PriorityClass.MEDIUM;
      }
      case TaskPriority.HEIGHT: {
        return PriorityClass.HEIGH;
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
