import { ListerService } from "@/utils/service/TableService";


export interface IPolicy {
  id?: number;
  created_at?: Date;
  protection?: string;
  protocol?: string;
  decalog?: string
}

export class PoliciesService extends ListerService<IPolicy> {
  constructor() {
    super("policies", ["*"]);
  }
}
