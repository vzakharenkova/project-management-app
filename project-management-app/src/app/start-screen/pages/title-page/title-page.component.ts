import { Component, EventEmitter, Output } from '@angular/core';
import { PAGES } from '../../models/pages';

@Component({
  selector: 'app-title',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.scss'],
})
export class TitlePageComponent {
  @Output() newPageEvent = new EventEmitter<number>();

  public nextPage: number = PAGES.SECOND;

  public changePageNumber(value: number) {
    this.newPageEvent.emit(value);
  }
}
