import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardModel } from '../boards-page/models/board.model';
import { boardList } from '../shared/boardsList';

@Component({
  selector: 'app-single-board-page',
  templateUrl: './single-board-page.component.html',
  styleUrls: ['./single-board-page.component.scss'],
})
export class SingleBoardPageComponent implements OnInit {
  public board!: BoardModel;

  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const boardTitle = params['title'];
      this.board = <BoardModel>boardList.find((item) => item.title === boardTitle);
    });
  }
}
