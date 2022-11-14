import { StateModel } from './state.model';

export const initialState: StateModel = {
  users: [],
  boards: [],
  localization: 'ru',
  currentUser: null,
  selectedBoard: null,
  token: null,
};
