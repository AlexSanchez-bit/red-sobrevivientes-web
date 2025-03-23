import { TestimonyService } from "@/services/Testimony/Testimony.service";

const testimonyService = new TestimonyService();

export const useTestimonyService = () => testimonyService;
