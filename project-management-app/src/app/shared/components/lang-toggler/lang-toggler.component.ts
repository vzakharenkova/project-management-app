import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { changeLocalization } from 'src/app/core/store/actions/localization.actions';
import { selectLocalization } from 'src/app/core/store/selectos/app.selectors';
import { StateModel } from 'src/app/core/store/state/state.model';

@Component({
  selector: 'app-lang-toggler',
  templateUrl: './lang-toggler.component.html',
  styleUrls: ['./lang-toggler.component.scss'],
})
export class LangTogglerComponent implements OnInit, OnDestroy {
  @Input() color: string;

  public lang: 'ru' | 'en';

  private subscription: Subscription;

  constructor(private store: Store<StateModel>, private transloco: TranslocoService) {}

  ngOnInit() {
    this.subscription = this.store.select(selectLocalization).subscribe((value) => {
      this.lang = value;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
}
