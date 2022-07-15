export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date | string;
}

export interface IUserBody {
  name: string;
  email: string;
  password: string;
}

export interface IUserToken {
  id: number;
  userId: number;
  token: string;
  createdAt: Date;
}
