import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/core/store/actions/auth.actions';
import { CreateBoardComponent } from '../../../workspace/create-board/create-board.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isScrolled: boolean;

  constructor(public dialog: MatDialog, private store: Store, private router: Router) {}

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
    localStorage.removeItem('token');
    this.store.dispatch(logOut());
    this.router.navigateByUrl('/welcome');
  }
}
