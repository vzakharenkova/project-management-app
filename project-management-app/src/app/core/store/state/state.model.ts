import { AuthDataModel, UserModel } from '../../../shared/models/user.model';
import { BoardModel } from '../../../shared/models/board.model';

export interface StateModel {
  users: UserModel[];
  boards: BoardModel[];
  selectedBoard: BoardModel;
  localization: 'ru' | 'en';
  authData: AuthDataModel | null;
  token: string | null;
}
