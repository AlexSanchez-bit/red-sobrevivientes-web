import { Filter } from "../entities/Filter";
import { Pagination } from "../entities/Pagination";
import { supabase } from "@/setup";
import { Sorter } from "../entities/Sorters";
import { FilterMatchMode } from "@primevue/core/api";
import moment from "moment-timezone";
import { useToastStorage } from "@/stores/ToasterStorage";

export abstract class ListerService<T> {
  public data!: T[];
  public totalCount: number = 0;
  protected tablename: string;
  protected search_fields: string[];
  private readonly user_id: string;
  constructor(tablename: string, searchFields: string[]) {
    // this.notify = useToastStorage();
    this.tablename = tablename;
    this.search_fields = searchFields;
    this.user_id = "jj";
  }
  get builder() {
    return supabase.from(this.tablename);
  }

  public buildSelect() {
    return this.builder.select(this.search_fields.join(" , "), {
      count: "exact",
    });
  }

  public async getDetails(id: string | number) {
    const { data } = await supabase
      .from(this.tablename)
      .select("*")
      .eq("id", id)
      .single();
    return data;
  }

  public async getAll(
    filters: Filter<any>[],
    pagination: Pagination,
    orders: Sorter[] | null,
  ): Promise<any[]> {
    let query = this.buildSelect();
    query = this.applyFilters(query, filters);
    if (orders != null) {
      for (let sortOrder of orders) {
        query = query.order(sortOrder.field, {
          ascending: sortOrder.order > 0,
        });
      }
    }

    query = query
      .range(
        pagination.page * pagination.ammount,
        pagination.page * pagination.ammount + pagination.ammount - 1,
      )
      .order("created_at", { ascending: false });

    let { data, count, error } = await query;

    if (error) {
      // this.notify.notify("error", "Ocurrio un error", error.message, 4000);
      const keys: any = {} as any;
      for (let field in this.search_fields) {
        keys[field] = null as any;
      }

      data = [keys];
      return [];
    }
    return data as any[];
  }

  public async getAllTotalCount(
    filters: Filter<any>[],
    pagination: Pagination,
    orders: Sorter[] | null,
  ): Promise<{ data: any[]; totalCount: number }> {
    let query = this.buildSelect();
    query = this.applyFilters(query, filters);
    if (orders != null) {
      for (let sortOrder of orders) {
        query = query.order(sortOrder.field, {
          ascending: sortOrder.order > 0,
        });
      }
    }

    query = query
      .range(
        pagination.page * pagination.ammount,
        pagination.page * pagination.ammount + pagination.ammount - 1,
      )
      .order("created_at", { ascending: false });

    let { data, count, error } = await query;

    if (error) {
      useToastStorage().notify(
        "error",
        "Ocurrio un error",
        error.message,
        4000,
      );

      data = [];
    }

    return { totalCount: count ?? (data ?? []).length, data };
  }

  public async getCount(
    filters: Filter<any>[],
  ): Promise<{ totalCount: number; error: any }> {
    let query = this.buildSelect();

    query = this.applyFilters(query, filters);

    let { data, count, error } = await query;

    if (error) {
      // this.notify.notify("error", "Ocurrio un error", error.message, 5000);
      return { totalCount: 0, error };
    }

    return { totalCount: count, error };
  }

  private applyFilters(query: any, filters: Filter<any>[]) {
    for (let filter of filters) {
      if (filter.matchMode === "CUSTOM_SUBQUERY") {
        // Aquí usamos el método "filter" para ejecutar la subconsulta
        query = query.filter(filter.field, "in", filter.value);
        continue; // saltamos al siguiente filtro
      }

      if (filter.matchMode == "IS") {
        query = query.is(filter.field, filter.value);
        continue;
      }
      if (filter.matchMode == "ISNOT") {
        query = query.not.is(filter.field, filter.value);
        continue;
      }
      if (filter.matchMode === "OR") {
        const [filter1, filter2] = filter.value as [
          Filter | null,
          Filter | null,
        ];
        const conditions: string[] = [];

        if (filter1 && filter1.value != null) {
          conditions.push(
            `${filter1.field}.${filter1.matchMode.toLowerCase()}.${JSON.stringify(filter1.value)}`,
          );
        }
        if (filter2 && filter2.value != null) {
          conditions.push(
            `${filter2.field}.${filter2.matchMode.toLowerCase()}.${JSON.stringify(filter2.value)}`,
          );
        }

        if (conditions.length > 0) {
          // .or() espera una única cadena con las condiciones separadas por comas
          query = query.or(conditions.join(" OR "));
        }
        continue;
      }
      if (filter.value != null) {
        let field = filter.field;
        switch (filter.matchMode) {
          case FilterMatchMode.IN:
            query = query.in(field, filter.value);
            break;
          case "NOT_IN":
            query = query.not(field, "in", `(${filter.value.join(",")})`);
            break;
          case FilterMatchMode.EQUALS:
            query = query.eq(field, filter.value);
            break;
          case FilterMatchMode.CONTAINS:
            query = query.ilike(field, `%${filter.value}%`);
            break;
          case FilterMatchMode.STARTS_WITH:
            query = query.ilike(field, `${filter.value}%`);
            break;
          case FilterMatchMode.NOT_CONTAINS:
            query = query.not(field, "ilike", `%${filter.value}%`);
            break;
          case FilterMatchMode.ENDS_WITH:
            query = query.ilike(field, `%${filter.value}`);
            break;
          case FilterMatchMode.NOT_EQUALS:
            query = query.not(field, "eq", filter.value);
            break;
          case FilterMatchMode.GREATER_THAN:
            query = query.gt(field, parseInt(filter.value));
            break;
          case FilterMatchMode.LESS_THAN:
            query = query.lt(field, parseInt(filter.value));
            break;
          case FilterMatchMode.GREATER_THAN_OR_EQUAL_TO:
            query = query.gte(field, parseInt(filter.value));
            break;
          case FilterMatchMode.LESS_THAN_OR_EQUAL_TO:
            query = query.lte(field, parseInt(filter.value));
            break;
          case FilterMatchMode.DATE_IS:
            const truncatedDate = new Date(filter.value)
              .toISOString()
              .split("T")[0];
            const startDate = new Date(truncatedDate);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 1);

            // Convertir las fechas a ISO string
            const startDateISOString = startDate.toISOString();
            const endDateISOString = endDate.toISOString();
            query = query
              .gte(field, startDateISOString)
              .lt(field, endDateISOString);
            break;
          case FilterMatchMode.DATE_IS_NOT:
            query = query.not(
              field,
              "eq",
              new Date(filter.value).toISOString(),
            );
            break;
          case FilterMatchMode.DATE_AFTER:
            // const date_after = new Date(filter.value);
            const filter_after = moment
              .tz(filter.value, "America/Havana")
              .startOf("day")
              .utc();
            const formatted_after = filter_after.format(
              "YYYY-MM-DD HH:mm:ss[+00:00]",
            );
            query = query.gte(field, formatted_after);
            break;
          case FilterMatchMode.DATE_BEFORE:
            const date_before = moment
              .tz(filter.value, "America/Havana")
              .endOf("day")
              .utc();
            const formatted_before = date_before.format(
              "YYYY-MM-DD HH:mm:ss[+00:00]",
            );
            query = query.lte(field, formatted_before);
            break;
        }
      }
    }
    return query;
  }
}
