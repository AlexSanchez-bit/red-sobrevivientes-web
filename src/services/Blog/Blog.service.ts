import { ListerService } from "@/utils/service/TableService";

export interface IBlogEntrie {
  id?: number;
  created_at?: Date;
  user_id: string;
  image?: string;
  text?: string;
  user: { name: string; email: string };
  title: string;
}

export class BlogEntrieService extends ListerService<IBlogEntrie> {
  constructor() {
    super("blog_entrie", ["*,user!inner(name,email)"]);
  }
}
