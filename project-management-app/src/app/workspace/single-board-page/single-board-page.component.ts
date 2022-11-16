import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Store } from '@ngrx/store';
import { StateModel } from 'src/app/core/store/state/state.model';
import { BoardModel } from 'src/app/shared/models/board.model';
import { ColumnModel } from 'src/app/shared/models/column.model';
import { never, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import {
  selectCurrentBoard,
  selectCurrentUser,
  selectUsers,
} from 'src/app/core/store/selectos/app.selectors';
import { getBoardById } from 'src/app/core/store/actions/board.actions';
import { UserModel } from 'src/app/shared/models/user.model';
import { updateAllColumns, updateColumn } from '../../core/store/actions/column.actions';

@Component({
  selector: 'app-single-board-page',
  templateUrl: './single-board-page.component.html',
  styleUrls: ['./single-board-page.component.scss', './drag&drop.scss'],
})
export class SingleBoardPageComponent implements OnInit, OnChanges {
  public board: BoardModel;

  public userLogin$: Observable<string | null>;

  public users$: Observable<UserModel[]>;

  private boardId: string;

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
    this.store.select(selectCurrentBoard).subscribe((value) => {
      if (value != null) this.board = JSON.parse(JSON.stringify(value));
    });
    this.userLogin$ = this.store.select(selectCurrentUser);
    this.users$ = this.store.select(selectUsers);
    this.userLogin$ = this.store.select(selectCurrentUser);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.store.select(selectCurrentBoard).subscribe((value) => {
      if (value != null) this.board = JSON.parse(JSON.stringify(value));
    });
  }

  drop(event: CdkDragDrop<ColumnModel[]>): void {
    moveItemInArray(this.board.columns!, event.previousIndex, event.currentIndex);
    this.updateAllColumns();
  }

  openCreateColumnForm(): void {
    this.dialog.open(CreateColumnComponent, {
      data: {
        boardId: this.boardId,
      },
    });
  }

  private updateAllColumns(): void {
    this.store.dispatch(
      updateAllColumns({
        boardId: this.board.id,
        columns: this.updateOrderAllColumns(),
      }),
    );
  }

  private updateOrderAllColumns() {
    if (this.board.columns !== undefined) {
      return this.board.columns!.map((column, index) => {
        return {
          columnId: column.id,
          data: {
            title: column.title,
            order: index + 1,
          },
        };
      });
    } else return [{ columnId: 'string', data: { title: 'string', order: 1 } }];
  }
}
