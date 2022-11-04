import { Component } from '@angular/core';
import { boardList } from '../shared/boardsList';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent {
  public boardList = boardList;
}
