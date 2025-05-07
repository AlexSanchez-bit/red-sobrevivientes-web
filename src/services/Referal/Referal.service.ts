import { supabase } from "@/setup";
import { ListerService } from "@/utils/service/TableService";


export enum ReferalStatus {
  CREATED = "CREATED",
}

export interface IReferal {
  id?: number;
  created_at: Date | string;
  name?: string;
  email?: string;
  status: ReferalStatus;
  phone_number: string;
  description: string;
}

export class ReferalService extends ListerService<IReferal> {
  constructor() {
    super("referals", ["*"]);
  }

  async create(data: IReferal) {
    return await supabase.from("referals").insert(data);
  }
}
