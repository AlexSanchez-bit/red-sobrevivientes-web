import { PromotionService } from "@/services/Promotion/Promotion.service";

const promotionService = new PromotionService();
export const usePromotionService = () => promotionService;
