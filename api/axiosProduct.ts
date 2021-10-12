import { IProductResponse, IProduct } from './../types/product';
import { IProductParams } from './../types/params';
import axiosClient from './axiosClient';
import queryString from 'query-string';
const productApi = {
  getProduct(params: IProductParams): Promise<IProductResponse> {
    const query = queryString.stringify(params);
    const url = `/product?${query}`;
    return axiosClient.get(url);
  },
  getProductDetail(id: string): Promise<IProduct> {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
  delete(id: string): Promise<any> {
    const url = `/product/${id}`;
    return axiosClient.delete(url);
  },
  create(formstate: Partial<IProduct>): Promise<any> {
    const url = '/product';
    return axiosClient.post(url, formstate);
  },
  update(formstate: Partial<IProduct>): Promise<any> {
    const url = `/product/${formstate._id}`;
    return axiosClient.patch(url, formstate);
  },
};

export default productApi;
