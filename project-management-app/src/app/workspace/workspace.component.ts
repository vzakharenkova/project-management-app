import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';

import { getAllBoards } from '../core/store/actions/board.actions';
import { getAllUsers } from '../core/store/actions/user.actions';
import { BREAKPOINTS } from '../shared/constants/constants';
import { SidenavService } from '../core/services/sidenav.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit, OnDestroy, AfterViewInit {
  public isXSmallScreen: boolean;

  @ViewChild('drawer') sidenav: MatDrawer;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getAllBoards());
    this.store.dispatch(getAllUsers());

    this.breakpointObserver.observe(BREAKPOINTS.xSmall).subscribe((res) => {
      this.isXSmallScreen = res.breakpoints[BREAKPOINTS.xSmall];
    });
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnDestroy(): void {
    this.breakpointObserver.ngOnDestroy();
  }
}
