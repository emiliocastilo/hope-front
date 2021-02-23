export class PaginationModel {
    constructor(public number: number, public size: number, public totalElements: number, public totalPages?: number) {}
}

export interface Pagination<T> {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
    content: Array<T>;
}
