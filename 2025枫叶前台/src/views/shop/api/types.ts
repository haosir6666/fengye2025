export interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface PageParams {
  pageNo: number;
  pageSize: number;
}

export interface PageResult<T> {
  dataList: T[];
  count: number;
}
export interface PageParams {
  page: number;
  pageSize: number;
  itemType: 1 | 2 | 3 | 4 | 5 | 6;
  itemId: number|'';
  itemName: string|'';
  appointUserId: number;
  amountType: number;
  tradeType: 1;
  createTimeOrder: boolean;
  amountOrder: boolean;
}
export interface PageUserParams {
  page: number;
  pageSize: number;
  buyOrSell: -1 | 1;
  itemType: 1 | 2 | 3 | 4 | 5 | 6;
  tradeType: 0 | 1 | 2 | -1 | -2 | -3;
}
export interface ItemType {
  value: number
  label: string
}