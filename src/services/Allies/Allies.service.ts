import { ListerService } from "@/utils/service/TableService";


export interface IAllies {
  id?: number;
  created_at?: Date;
  name: string;
  icon?: string;
  link?: string;
}

export class AllieService extends ListerService<IAllies> {
  constructor() {
    super("allies", ["*"]);
  }
}
