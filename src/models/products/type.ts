export namespace IEntitiy {
  export interface Product {
    brand: null | string;
    id: string;
    price: number;
    product: string;
  }
  export interface FieldType {
    product?: string;
    price?: string;
    brand?: string;
  }
  export interface ParamsType {
    offset: number;
    limit: number;
  }
  export interface ProductIds {
    result: string[];
  }
  export enum PagingType {
    PREVIOUS = "PREVIOUS",
    NEXT = "NEXT",
  }
  export interface FiltersType {
    brand: string;
    price: string;
    product: string;
  }
}
