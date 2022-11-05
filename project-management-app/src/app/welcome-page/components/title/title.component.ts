import { Component, EventEmitter, Output } from '@angular/core';
import { PAGES } from '../../models/pages';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
  @Output() newPageEvent = new EventEmitter<number>();

  public nextPage: number = PAGES.SECOND;

  public changePageNumber(value: number) {
    this.newPageEvent.emit(value);
  }
}
