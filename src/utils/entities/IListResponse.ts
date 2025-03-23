export interface IListResponse<T> {
  items: T[];
  currentPage: number;
  limit: number;
  totalPages: number;
}
