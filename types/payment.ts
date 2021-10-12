import { IProduct } from '.';

export interface IInfor {
  name: string;
  phone: number | string;
  province: any;
  district: any;
  ward: any;
  address: string;
}

export interface IOrder {
  address: string;
  cart: IProduct[];
  email: string;
  name: string;
  phone: number;
  status: boolean;
  total: number;
  typePay: string;
  _id?: string;
}
