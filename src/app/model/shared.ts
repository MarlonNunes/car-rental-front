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

export interface ViaCepDetails{
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  }