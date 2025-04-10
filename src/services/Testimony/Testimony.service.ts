import { supabase } from "@/setup";
import { ListerService } from "@/utils/service/TableService";

export interface ITestimony {
  id?: number;
  created_at: Date;
  name: string;
  laic_involved?: number;
  location?: any;
  text: string;
}

export class TestimonyService extends ListerService<ITestimony> {
  constructor() {
    super("testimony", ["*"]);
  }

  async create(data: ITestimony) {
    return await supabase.from("testimony").insert(data).select();
  }

  async getStadistics() {
    return await supabase
      .from("laic_type")
      .select("name,image,testimony(*)")
      .eq("testimony.status", "ACCEPTED");
  }
}
