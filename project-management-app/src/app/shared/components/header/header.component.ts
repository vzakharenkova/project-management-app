import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from '../../../workspace/create-board/create-board.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isScrolled: boolean;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.animateHeader();
  }

  public animateHeader() {
    window.onscroll = () => {
      if (window.pageYOffset > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    };
  }

  openFormCreateBoard() {
    this.dialog.open(CreateBoardComponent);
  }
}
