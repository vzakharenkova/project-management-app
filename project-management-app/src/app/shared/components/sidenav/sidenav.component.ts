import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslocoService } from '@ngneat/transloco';

import { AuthService } from '../../../core/services/auth.service';
import { StateModel } from '../../../core/store/state/state.model';
import { selectLocalization } from '../../../core/store/selectos/app.selectors';
import { CreateBoardComponent } from '../../../workspace/create-board/create-board.component';
import { changeLocalization } from '../../../core/store/actions/localization.actions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent implements OnInit, OnDestroy {
  public lang: 'ru' | 'en';

  private localizationSub: Subscription;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private store: Store<StateModel>,
    private transloco: TranslocoService,
  ) {}

  ngOnInit() {
    this.localizationSub = this.store.select(selectLocalization).subscribe((value) => {
      this.lang = value;
    });
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
    this.localizationSub.unsubscribe();
  }
}
