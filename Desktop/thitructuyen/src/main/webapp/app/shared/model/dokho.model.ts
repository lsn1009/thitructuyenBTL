import { ICauhoi } from 'app/shared/model/cauhoi.model';

export interface IDokho {
  id?: number;
  dokho?: string;
  cauhois?: ICauhoi[];
}

export class Dokho implements IDokho {
  constructor(public id?: number, public dokho?: string, public cauhois?: ICauhoi[]) {}
}
