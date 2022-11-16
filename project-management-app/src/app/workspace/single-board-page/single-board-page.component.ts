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
import { UserModel } from 'src/app/shared/models/user.model';
import { updateColumn } from '../../core/store/actions/column.actions';

@Component({
  selector: 'app-single-board-page',
  templateUrl: './single-board-page.component.html',
  styleUrls: ['./single-board-page.component.scss', './drag&drop.scss'],
})
export class SingleBoardPageComponent implements OnInit {
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

  drop(event: CdkDragDrop<ColumnModel[]>): void {
    moveItemInArray(this.board.columns!, event.previousIndex, event.currentIndex);
    this.updateColumnsOrder(event);
  }

  openCreateColumnForm(): void {
    this.dialog.open(CreateColumnComponent, {
      data: {
        boardId: this.boardId,
      },
    });
  }

  private updateColumnsOrder(event: CdkDragDrop<ColumnModel[]>): void {
    this.store.dispatch(updateColumn(this.createPropsUpdColumn(event)));
  }

  private createPropsUpdColumn(event: CdkDragDrop<ColumnModel[]>) {
    let order: number = 1;

    if (event.previousIndex === 0 && event.currentIndex !== 0) {
      order = event.currentIndex + 1;
    } else if (event.currentIndex !== 0) {
      order = event.currentIndex + 1;
    }

    return {
      boardId: this.boardId,
      columnId: this.board.columns![event.currentIndex].id,
      data: {
        title: this.board.columns![event.currentIndex].title,
        order: order,
      },
    };
  }
}
