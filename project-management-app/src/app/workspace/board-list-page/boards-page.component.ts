import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectBoards } from 'src/app/core/store/selectos/app.selectors';
import { StateModel } from 'src/app/core/store/state/state.model';
import { BoardModel } from 'src/app/shared/models/board.model';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit, OnDestroy {
  boards: BoardModel[];

  private boardsSubscribtion: Subscription;

  // eslint-disable-next-line @ngrx/no-typed-global-store
  constructor(private store: Store<StateModel>) {}

  ngOnInit(): void {
    this.boardsSubscribtion = this.store
      .select(selectBoards)
      // eslint-disable-next-line @ngrx/no-store-subscription
      .subscribe((boards) => this.boards === boards);
  }

  ngOnDestroy(): void {
    this.boardsSubscribtion.unsubscribe();
  }
}
