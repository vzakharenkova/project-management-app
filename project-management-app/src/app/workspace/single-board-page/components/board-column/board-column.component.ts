import { Component, Input } from '@angular/core';
import { ColumnModel } from 'src/app/workspace/board-list-page/models/board.model';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  @Input() column: ColumnModel;
}
