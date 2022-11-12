import { createReducer, on } from '@ngrx/store';

import { changeLocalization } from '../actions/localization.actions';

const initialState = 'ru';

export const localizationReducer = createReducer(
  initialState,
  on(changeLocalization, (state): string => (state === 'ru' ? 'en' : 'ru')),
);
