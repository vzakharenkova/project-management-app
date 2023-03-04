import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { StateModel } from '../../core/store/state/state.model';
import { BoardModel } from '../../shared/models/board.model';
import { ColumnModel } from '../../shared/models/column.model';
import { CreateColumnComponent } from './components/create-column/create-column.component';
import {
  selectCurrentBoard,
  selectCurrentUser,
  selectUsers,
} from '../../core/store/selectos/app.selectors';
import { closeBoard, getBoardById } from '../../core/store/actions/board.actions';
import { AuthDataModel, UserModel } from '../../shared/models/user.model';
import { updateColumn } from '../../core/store/actions/column.actions';
import { calculateOrder } from '../../shared/utils/calculateOrder';
import { FormControl } from '@angular/forms';

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

  public tasksSearch = new FormControl('');

  public filterTerm: string = '';

  public isScrolledToEnd: boolean;

  private boardId: string;

  private routeSubscription: Subscription;

  private boardSubscription: Subscription;

  constructor(
    public route: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store<StateModel>,
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.boardId = params['id'];
    });
    this.store.dispatch(getBoardById({ boardId: this.boardId }));
    this.boardSubscription = this.store.select(selectCurrentBoard).subscribe((value) => {
      if (value != null) {
        this.board = JSON.parse(JSON.stringify(value));
      }
    });

    this.user$ = this.store.select(selectCurrentUser);
    this.users$ = this.store.select(selectUsers);
  }

  public drop(event: CdkDragDrop<ColumnModel[]>): void {
    moveItemInArray(this.board.columns!, event.previousIndex, event.currentIndex);
    this.updateColumnsOrder(event);
  }

  public openCreateColumnForm(): void {
    this.dialog.open(CreateColumnComponent, {
      data: {
        boardId: this.boardId,
      },
    });
  }

  public onScroll(evt: Event) {
    const container = <HTMLDivElement>evt.target;

    const containerWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const scroll = container.scrollLeft;

    this.isScrolledToEnd = containerWidth === clientWidth + scroll;
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

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.boardSubscription.unsubscribe();
    this.store.dispatch(closeBoard());
  }
}
