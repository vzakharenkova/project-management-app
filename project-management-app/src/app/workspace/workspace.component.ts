import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllBoards } from '../core/store/actions/board.actions';
import { getAllUsers } from '../core/store/actions/user.actions';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getAllBoards());
    this.store.dispatch(getAllUsers());
  }
}
