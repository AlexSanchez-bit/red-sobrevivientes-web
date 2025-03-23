import { ListerService } from "@/utils/service/TableService";

export interface IPromotion {
  id?: number;
  created_at?: Date;
  start_date: Date;
  end_date: Date;
  text: string;
  redirection_url?: string;
  image?: string;
  redirection_text?: string;
}

export class PromotionService extends ListerService<IPromotion> {
  constructor() {
    super("promotion", ["*"]);
  }
}
