import { type IResponseModel } from "./ResponseModel";
import { type IListResponse } from "./IListResponse";
export interface IGenericLister<T> {
  GetAll(
    page: number,
    limit: number,
    filter: any,
  ): Promise<IResponseModel<IListResponse<T>>>;
}
