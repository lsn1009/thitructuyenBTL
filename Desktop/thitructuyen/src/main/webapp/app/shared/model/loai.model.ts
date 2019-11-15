import { ICauhoi } from 'app/shared/model/cauhoi.model';

export interface ILoai {
  id?: number;
  tenloai?: string;
  cauhois?: ICauhoi[];
}

export class Loai implements ILoai {
  constructor(public id?: number, public tenloai?: string, public cauhois?: ICauhoi[]) {}
}
