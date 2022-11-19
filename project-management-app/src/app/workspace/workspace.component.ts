import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { getAllBoards } from '../core/store/actions/board.actions';
import { getAllUsers } from '../core/store/actions/user.actions';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getAllBoards());
    this.store.dispatch(getAllUsers());
  }
}
