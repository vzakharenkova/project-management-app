import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
  @Output() newPageEvent = new EventEmitter<number>();

  public changePageNumber(value: number) {
    this.newPageEvent.emit(value);
  }
}
