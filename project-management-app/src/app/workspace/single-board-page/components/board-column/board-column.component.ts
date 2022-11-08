import { Component, Input, OnInit } from '@angular/core';
import { ColumnModel } from 'src/app/workspace/board-list-page/models/board.model';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  @Input() column: ColumnModel;

  public title: string;

  ngOnInit() {
    this.title = this.column.title;
  }

  editColumnTitle(input: EventTarget | null) {
    if (input) {
      (<HTMLInputElement>input).readOnly = !(<HTMLInputElement>input).readOnly;
    }
  }
}
