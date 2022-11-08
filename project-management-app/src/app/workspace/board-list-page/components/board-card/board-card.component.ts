import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { boardList } from 'src/app/shared/mocks/boardsList';
import { BoardModel } from '../../models/board.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() board: BoardModel;

  constructor(private router: Router, public dialog: MatDialog) {}

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
    const selectedBoard = boardList.find((item) => item.title === board.title);
    boardList.splice(boardList.indexOf(<BoardModel>selectedBoard), 1);
    this.dialog.closeAll();
  }

  public openBoard() {
    this.router.navigate(['boards', this.board.title]);
  }
}
