import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from '../../../workspace/create-board/create-board.component';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { changeLocalization } from '../../../core/store/actions/localization.actions';
import { Subscription } from 'rxjs';
import { selectLocalization } from '../../../core/store/selectos/app.selectors';
import { StateModel } from '../../../core/store/state/state.model';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isScrolled: boolean;

  public lang: 'ru' | 'en';

  private subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private store: Store<StateModel>,
    private transloco: TranslocoService,
  ) {}

  ngOnInit() {
    this.subscription = this.store.select(selectLocalization).subscribe((value) => {
      this.lang = value;
    });
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
