import { Component, EventEmitter, Output } from '@angular/core';
import { PAGES } from '../../models/pages';

@Component({
  selector: 'app-description',
  templateUrl: './description-page.component.html',
  styleUrls: ['./description-page.component.scss'],
})
export class DescriptionPageComponent {
  @Output() newPageEvent = new EventEmitter<number>();

  public prevPage: number = PAGES.SECOND;

  public changePageNumber(value: number) {
    this.newPageEvent.emit(value);
  }
}
