import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { signedIn } from './core/store/actions/auth-api.actions';
import { StateModel } from './core/store/state/state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'project-management-app';

  constructor(private store: Store<StateModel>) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.store.dispatch(
        signedIn({
          tokenObj: { token },
        }),
      );
    }
  }
}
