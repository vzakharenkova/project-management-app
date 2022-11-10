import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardModel, ColumnModel } from '../board-list-page/models/board.model';
import { boardList } from '../../shared/mocks/boardsList';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-single-board-page',
  templateUrl: './single-board-page.component.html',
  styleUrls: ['./single-board-page.component.scss'],
})
export class SingleBoardPageComponent implements OnInit {
  public board: BoardModel;

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const boardTitle = params['title'];
      this.board = <BoardModel>boardList.find((item) => item.title === boardTitle);
    });
  }

  drop(event: CdkDragDrop<ColumnModel[]>) {
    moveItemInArray(this.board.columns!, event.previousIndex, event.currentIndex);
  }
}
