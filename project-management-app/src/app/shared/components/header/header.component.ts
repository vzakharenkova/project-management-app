import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslocoService } from '@ngneat/transloco';
import { BreakpointObserver } from '@angular/cdk/layout';

import { CreateBoardComponent } from '../../../workspace/create-board/create-board.component';
import { AuthService } from '../../../core/services/auth.service';
import { changeLocalization } from '../../../core/store/actions/localization.actions';
import { selectLocalization } from '../../../core/store/selectos/app.selectors';
import { StateModel } from '../../../core/store/state/state.model';
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

  public lang: 'ru' | 'en';

  public isSmallScreen: boolean;

  public isXSmallScreen: boolean;

  private localizationSub: Subscription;

  private sidenavSub: Subscription;

  constructor(
    public dialog: MatDialog,
    public sidenavService: SidenavService,
    private authService: AuthService,
    private store: Store<StateModel>,
    private transloco: TranslocoService,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.localizationSub = this.store.select(selectLocalization).subscribe((value) => {
      this.lang = value;
    });

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

  public changeLangRu(lang: 'ru' | 'en') {
    localStorage.setItem('lang', 'ru');
    this.transloco.setActiveLang('ru');
    if (lang != 'ru') this.store.dispatch(changeLocalization());
  }

  public changeLangEn(lang: 'ru' | 'en') {
    this.transloco.setActiveLang('en');
    localStorage.setItem('lang', 'en');
    if (lang != 'en') this.store.dispatch(changeLocalization());
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  ngOnDestroy() {
    this.localizationSub.unsubscribe();
    this.sidenavSub.unsubscribe();
    this.breakpointObserver.ngOnDestroy();
  }
}
