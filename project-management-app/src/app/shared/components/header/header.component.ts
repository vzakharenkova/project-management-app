import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from '../../../workspace/create-board/create-board.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isScrolled: boolean;

  constructor(public dialog: MatDialog, private authService: AuthService) {}

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

  public openFormCreateBoard() {
    this.dialog.open(CreateBoardComponent);
  }

  public logout() {
    this.authService.logout();
  }
}
