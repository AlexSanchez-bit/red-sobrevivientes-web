import { BlogEntrieService } from "@/services/Blog/Blog.service";

const blog = new BlogEntrieService();

export const useBlogService = () => blog;
