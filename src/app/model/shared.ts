export class IdName{
    id: number;
    name: string;
}

export interface PageDTO<T>{
    content: T[];
    page: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
}