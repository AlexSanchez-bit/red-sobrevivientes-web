import { ReferalService } from "@/services/Referal/Referal.service";

const referalService = new ReferalService()


export const useReferalService = () => referalService
