import { UserModel } from '../../../shared/models/user.model';
import { BoardModel } from '../../../shared/models/board.model';

export interface StateModel {
  users: UserModel[];
  boards: BoardModel[];
  selectedBoard: BoardModel | null;
  localization: 'ru' | 'en';
  currentUser: string | null;
  token: string | null;
}
