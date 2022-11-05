import { Component, EventEmitter, Output } from '@angular/core';
import { PAGES } from '../../models/pages';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
  @Output() newPageEvent = new EventEmitter<number>();

  public prevPage: number = PAGES.SECOND;

  public changePageNumber(value: number) {
    this.newPageEvent.emit(value);
  }
}
