import { LaicTypeService } from "@/services/LaicType/laicType.service";

const laicType = new LaicTypeService();

export const useLaicTypeService = () => laicType;
