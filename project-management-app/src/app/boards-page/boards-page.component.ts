import { Component } from '@angular/core';
import { BoardModel } from './models/board.model';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent {
  boardList: BoardModel[] = [
    { title: 'Fhfjhvdf' },
    { title: 'Agrthyr' },
    { title: 'Sgregherh' },
    { title: 'Bfwegfer' },
    { title: 'Wgrgherh' },
  ];
}
