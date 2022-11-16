import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Store } from '@ngrx/store';
import { StateModel } from 'src/app/core/store/state/state.model';
import { BoardModel } from 'src/app/shared/models/board.model';
import { ColumnModel } from 'src/app/shared/models/column.model';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import {
  selectCurrentBoard,
  selectCurrentUser,
  selectUsers,
} from 'src/app/core/store/selectos/app.selectors';
import { getBoardById } from 'src/app/core/store/actions/board.actions';
import { AuthDataModel, UserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-single-board-page',
  templateUrl: './single-board-page.component.html',
  styleUrls: ['./single-board-page.component.scss', './drag&drop.scss'],
})
export class SingleBoardPageComponent implements OnInit {
  public board$: Observable<BoardModel>;

  private boardId: string;

  public user$: Observable<AuthDataModel | null>;

  public users$: Observable<UserModel[]>;

  constructor(
    public route: ActivatedRoute,
    private store: Store<StateModel>,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const boardId = params['id'];
      this.boardId = boardId;
    });
    this.store.dispatch(getBoardById({ boardId: this.boardId }));
    this.board$ = <Observable<BoardModel>>this.store.select(selectCurrentBoard);
    this.user$ = this.store.select(selectCurrentUser);
    this.users$ = this.store.select(selectUsers);
  }

  drop(event: CdkDragDrop<ColumnModel[]>, board: BoardModel) {
    moveItemInArray(board.columns!, event.previousIndex, event.currentIndex);
  }

  openCreateColumnForm() {
    this.dialog.open(CreateColumnComponent, {
      data: {
        boardId: this.boardId,
      },
    });
  }
}
