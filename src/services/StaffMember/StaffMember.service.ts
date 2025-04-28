export interface StaffMember {
  id?: number;
  created_at?: Date;
  name: string;
  picture?: string;
  profile_link?: string;
  speciality?: string;
}

import { ListerService } from "@/utils/service/TableService";

export class StaffService extends ListerService<StaffMember> {
  constructor() {
    super("staff_member", ["*"]);
  }
}
