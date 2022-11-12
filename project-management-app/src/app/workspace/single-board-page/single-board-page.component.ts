import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Store } from '@ngrx/store';
import { StateModel } from 'src/app/core/store/state/state.model';
import { selectBoardById } from 'src/app/core/store/selectos/app.selectors';
import { BoardModel } from 'src/app/shared/models/board.model';
import { ColumnModel } from 'src/app/shared/models/column.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-board-page',
  templateUrl: './single-board-page.component.html',
  styleUrls: ['./single-board-page.component.scss', './drag&drop.scss'],
})
export class SingleBoardPageComponent implements OnInit, OnDestroy {
  public board: BoardModel;

  private boardSubscribtion: Subscription;

  // eslint-disable-next-line @ngrx/no-typed-global-store
  constructor(public route: ActivatedRoute, private store: Store<StateModel>) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const boardId = params['id'];
      // eslint-disable-next-line @ngrx/no-store-subscription
      this.store.select(selectBoardById(boardId)).subscribe((board) => (this.board = board));
    });
  }

  ngOnDestroy(): void {
    this.boardSubscribtion.unsubscribe();
  }

  drop(event: CdkDragDrop<ColumnModel[]>) {
    moveItemInArray(this.board.columns!, event.previousIndex, event.currentIndex);
  }
}
