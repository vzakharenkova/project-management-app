export interface UserDataModel {
  name: string;
  login: string;
}

export interface UserModel extends UserDataModel {
  id: string;
}

export interface AuthDataModel extends UserDataModel {
  password: string;
}
