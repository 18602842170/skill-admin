export interface QueryResults<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
    extra?: any;
}
export interface IQuery {
    limit?: number;
    offset?: number;
    fields?: string;
    is_delete?: boolean;
    ordering?: string;
    order?: string;
    order_by?: string;
}
