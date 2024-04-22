export class RequestStore {
    legalName: string;
    cnpj: string;
    logoUrl: string;
    contacts: Contact[];
    city: string;
    state: string;
    addressStreet: string;
    addressNumber: number;
}

export class StoreDetails {
    id: number;
    legalName: string;
    cnpj: string;
    logoUrl: string;
    contacts: Contact[];
    city: string;
    state: string;
    addressStreet: string;
    addressNumber: number;
    createdAt: string;
    createdBy: number;
    createdByName: string;
    updatedAt: string;
    updatedBy: number;
    updatedByName: string;
  zipCode: any;
  district: any;
}

export class Contact {
    id: number;
    type: ContactType;
    value: string;
    storeId: number;
    disabled: boolean;
}

export enum ContactType{
    EMAIL,
    PHONE_NUMBER,
    WHATSAPP,
    LINKEDIN,
    FACEBOOK,
    INSTAGRAM,
    X
}

export enum ContactTypeIcon{
    EMAIL = "fa-solid fa-envelope",
    PHONE_NUMBER = "fa-solid fa-phone",
    WHATSAPP = "fa-brands fa-whatsapp",
    LINKEDIN = "fa-brands fa-linkedin",
    FACEBOOK = "fa-brands fa-facebook",
    INSTAGRAM = "fa-brands fa-instagram",
    X = "fa-brands fa-x-twitter"
}

export class StoreParams {
    id?: number[];
    legalName?: string[];
    cnpj?: string[];
    createdAtIni?: Date;
    createdAtEnd?: Date;
    page?: number;
    pageSize?: number;
}