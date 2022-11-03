import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
  @Output() newPageEvent = new EventEmitter<number>();

  public changePageNumber(value: number) {
    this.newPageEvent.emit(value);
  }
}
