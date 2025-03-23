import { ListerService } from "@/utils/service/TableService";

export interface ILaicType {
  id?: number;
  created_at?: Date;
  name: string;
  description?: string;
  image?: string;
}

export class LaicTypeService extends ListerService<ILaicType> {
  constructor() {
    super("laic_type", ["*"]);
  }
}
