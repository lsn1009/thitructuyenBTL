import { IUser } from 'app/core/user/user.model';

export interface IKetqua {
  id?: number;
  diemso?: number;
  user?: IUser;
}

export class Ketqua implements IKetqua {
  constructor(public id?: number, public diemso?: number, public user?: IUser) {}
}
