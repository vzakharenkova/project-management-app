import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';

import { CreateBoardComponent } from '../../../workspace/create-board/create-board.component';
import { AuthService } from '../../../core/services/auth.service';
import { BREAKPOINTS } from '../../constants/constants';
import { SidenavService } from '../../../core/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isScrolled: boolean;

  public isSmallScreen: boolean;

  public isXSmallScreen: boolean;

  constructor(
    public dialog: MatDialog,
    public sidenavService: SidenavService,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.animateHeader();

    this.breakpointObserver.observe([BREAKPOINTS.small, BREAKPOINTS.xSmall]).subscribe((res) => {
      this.isSmallScreen = res.breakpoints[BREAKPOINTS.small];
      this.isXSmallScreen = res.breakpoints[BREAKPOINTS.xSmall];
    });
  }

  public animateHeader() {
    window.onscroll = () => {
      this.isScrolled = window.pageYOffset > 0;
    };
  }

  public openFormCreateBoard() {
    this.dialog.open(CreateBoardComponent);
  }

  public logout() {
    this.authService.logout();
  }

  public toggleSidenav() {
    this.sidenavService.toggle();
  }

  ngOnDestroy() {
    this.breakpointObserver.ngOnDestroy();
  }
}
