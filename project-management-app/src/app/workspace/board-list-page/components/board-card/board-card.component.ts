import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteBoard } from 'src/app/core/store/actions/board.actions';
import { StateModel } from 'src/app/core/store/state/state.model';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { BoardModel } from '../../../../shared/models/board.model';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() board: BoardModel;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store<StateModel>,
    private transloco: TranslocoService,
  ) {}

  public openConfirmationDialog(e: Event) {
    e.stopPropagation();

    this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: this.transloco.translateObject('dialogDelBoard.title'),
        content: this.transloco.translateObject('dialogDelBoard.content', {
          name: this.board.title,
        }),
        handler: () => this.deleteBoard(this.board),
      },
    });
  }

  public openBoard() {
    this.router.navigate(['boards', this.board.id]);
  }

  private deleteBoard(board: BoardModel) {
    this.store.dispatch(deleteBoard({ boardId: board.id }));
    this.dialog.closeAll();
  }
}
