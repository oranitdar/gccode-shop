export enum SortOrder {
  ASC,
  DESC,
}

export enum SortType {
    NUMBER,
    STRING,
  }

export interface ISorter {
  field: string;
  order: SortOrder;
  type: SortType,
}