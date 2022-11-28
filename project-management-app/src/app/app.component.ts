import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getDataFromLS } from './core/store/actions/auth.actions';
import { TranslocoService } from '@ngneat/transloco';
import { StateModel } from './core/store/state/state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-management-app';

  private lang: string | null;

  constructor(private store: Store<StateModel>, private transloco: TranslocoService) {}

  ngOnInit(): void {
    this.store.dispatch(getDataFromLS());
    this.lang = localStorage.getItem('lang');
    if (this.lang !== 'ru' && this.lang !== 'en') this.lang = 'en';
    this.transloco.setActiveLang(this.lang);
  }
}
