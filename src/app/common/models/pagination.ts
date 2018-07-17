export class Pagination<T> {
    PageNumber: number;
    TotalPages: number;
    TotalCount: number;
    PageSize: number;
    HasPrevious: boolean;
    HasNext: boolean;
    Items: T[];
}
