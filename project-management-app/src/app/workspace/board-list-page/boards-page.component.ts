import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBoards } from 'src/app/core/store/selectos/app.selectors';
import { StateModel } from 'src/app/core/store/state/state.model';
import { BoardModel } from 'src/app/shared/models/board.model';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  public boards$: Observable<BoardModel[]>;

  constructor(private store: Store<StateModel>) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(selectBoards);
  }
}
