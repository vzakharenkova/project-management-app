import { CdkDragDrop } from '@angular/cdk/drag-drop';

export const calculateOrder = (event: CdkDragDrop<any>): number => {
  let order: number = 1;

  if (event.previousIndex === 0 && event.currentIndex !== 0) {
    order = event.currentIndex + 1;
  } else if (event.currentIndex !== 0) {
    order = event.currentIndex + 1;
  }
  return order;
};
