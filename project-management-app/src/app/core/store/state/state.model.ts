import { UserModel } from '../../../shared/models/user.model';
import { BoardModel } from '../../../shared/models/board.model';

export interface StateModel {
  users: UserModel[];
  boards: BoardModel[];
  localization: 'ru' | 'en';
}
