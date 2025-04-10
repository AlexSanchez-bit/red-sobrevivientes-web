import { supabase } from "@/setup";
import { ListerService } from "@/utils/service/TableService";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export interface ITestimony {
  id?: number;
  created_at: Date;
  name: string;
  laic_involved?: number;
  location?: any;
  text: string;
  gender?: Gender;
  age?: number;
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

  async getAgeStadistics() {
    return await supabase.rpc("age_statistics"); // nombre exacto de la función en la base de datos
  }
  async getGenderStadistics() {
    return await supabase.rpc("gender_statistics"); // nombre exacto de la función en la base de datos
  }
}
