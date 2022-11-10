import { createReducer, on } from '@ngrx/store';

import { initialState } from '../state/app.state';
import { changeLocalization } from '../actions/localization.actions';
import { StateModel } from '../state/state.model';

export const localizationReducer = createReducer(
  initialState,
  on(
    changeLocalization,
    (state): StateModel => ({
      ...state,
      localization: state.localization === 'ru' ? 'en' : 'ru',
    }),
  ),
);
