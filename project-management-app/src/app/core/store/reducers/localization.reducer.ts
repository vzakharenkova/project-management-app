import { createReducer, on } from '@ngrx/store';

import { changeLocalization } from '../actions/localization.actions';

const initialState: string | null = 'en';

export const localizationReducer = createReducer(
  <string | null>initialState,
  on(changeLocalization, (): string | null => {
    if (localStorage.getItem('lang') !== null) {
      return localStorage.getItem('lang');
    } else return 'en';
  }),
);
