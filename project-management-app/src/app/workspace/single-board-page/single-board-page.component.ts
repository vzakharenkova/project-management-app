import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Store } from '@ngrx/store';
import { StateModel } from 'src/app/core/store/state/state.model';
import { selectBoardById } from 'src/app/core/store/selectos/app.selectors';
import { BoardModel } from 'src/app/shared/models/board.model';
import { ColumnModel } from 'src/app/shared/models/column.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-board-page',
  templateUrl: './single-board-page.component.html',
  styleUrls: ['./single-board-page.component.scss', './drag&drop.scss'],
})
export class SingleBoardPageComponent implements OnInit {
  public board$: Observable<BoardModel>;

  constructor(public route: ActivatedRoute, private store: Store<StateModel>) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const boardId = params['id'];
      this.board$ = this.store.select(selectBoardById(boardId));
    });
  }

  drop(event: CdkDragDrop<ColumnModel[]>, board: BoardModel) {
    moveItemInArray(board.columns!, event.previousIndex, event.currentIndex);
  }
}
