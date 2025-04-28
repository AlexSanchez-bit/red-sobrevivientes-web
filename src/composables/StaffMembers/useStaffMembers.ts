import { StaffService } from "@/services/StaffMember/StaffMember.service";

const staffM = new StaffService();
export const useStaffMemberService = () => staffM;
