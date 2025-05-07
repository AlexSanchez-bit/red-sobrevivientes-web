import { PoliciesService } from "@/services/Policy/Policy.service";

const policyS = new PoliciesService()

export const usePolicyService = () => policyS
