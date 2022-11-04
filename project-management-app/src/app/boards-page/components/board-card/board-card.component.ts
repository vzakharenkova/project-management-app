import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BoardModel } from '../../models/board.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input() board!: BoardModel;

  constructor(private router: Router) {}

  public openBoard() {
    this.router.navigate(['boards', this.board.title]);
  }
}
