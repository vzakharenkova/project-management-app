import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Store } from '@ngrx/store';
import { StateModel } from 'src/app/core/store/state/state.model';
import { BoardModel } from 'src/app/shared/models/board.model';
import { ColumnModel } from 'src/app/shared/models/column.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import {
  selectCurrentBoard,
  selectCurrentUser,
  selectUsers,
} from 'src/app/core/store/selectos/app.selectors';
import { closeBoard, getBoardById } from 'src/app/core/store/actions/board.actions';
import { AuthDataModel, UserModel } from 'src/app/shared/models/user.model';
import { updateColumn } from '../../core/store/actions/column.actions';
import { calculateOrder } from '../../shared/utils/calculateOrder';

@Component({
  selector: 'app-single-board-page',
  templateUrl: './single-board-page.component.html',
  styleUrls: ['./single-board-page.component.scss', './drag&drop.scss'],
})
export class SingleBoardPageComponent implements OnInit, OnDestroy {
  public board: BoardModel;

  public board$: Observable<BoardModel>;

  public user$: Observable<AuthDataModel | null>;

  public users$: Observable<UserModel[]>;

  private boardId: string;

  private routeSubscription: Subscription;

  private boardSubscription: Subscription;

  constructor(
    public route: ActivatedRoute,
    private store: Store<StateModel>,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      const boardId = params['id'];
      this.boardId = boardId;
    });
    this.store.dispatch(getBoardById({ boardId: this.boardId }));
    this.boardSubscription = this.store.select(selectCurrentBoard).subscribe((value) => {
      if (value != null) this.board = JSON.parse(JSON.stringify(value));
    });
    this.user$ = this.store.select(selectCurrentUser);
    this.users$ = this.store.select(selectUsers);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
    this.store.dispatch(closeBoard());
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
    return {
      boardId: this.boardId,
      columnId: this.board.columns![event.currentIndex].id,
      data: {
        title: this.board.columns![event.currentIndex].title,
        order: calculateOrder(event),
      },
    };
  }
}
