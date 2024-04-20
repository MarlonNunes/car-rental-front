export class RequestUser {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    cpf: string;
    roles: Role[];
  }
  
  export class Role {
    id: string;
    name: string;
  }

  export class UserDTO {
    id?: string;
    email: string;
    keycloackId: string;
    firstName: string;
    lastName: string;
    fullName: string;
    cpf: string;
    roles: Role[];
    enabled: boolean;
  }

  export interface SearchParams {
    name?: string[];
    email?: string[];
    cpf?: string[];
    id?: number[];
    createdAtIni?: Date;
    createdAtEnd?: Date;
    page?: number;
    pageSize?: number;
  }
  