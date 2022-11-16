import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteBoard } from 'src/app/core/store/actions/board.actions';
import { StateModel } from 'src/app/core/store/state/state.model';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { BoardModel } from '../../../../shared/models/board.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() board: BoardModel;

  constructor(private router: Router, public dialog: MatDialog, private store: Store<StateModel>) {}

  public openConfirmationDialog(e: Event) {
    e.stopPropagation();

    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: 'Delete board',
        content: `Do you want to delete ${this.board.title} board?`,
        handler: () => this.deleteBoard(this.board),
      },
    });
  }

  private deleteBoard(board: BoardModel) {
    this.store.dispatch(deleteBoard({ boardId: board.id }));
    this.dialog.closeAll();
  }

  public openBoard() {
    this.router.navigate(['boards', this.board.id]);
  }
}
