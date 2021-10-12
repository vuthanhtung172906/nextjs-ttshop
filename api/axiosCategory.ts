import { ICategory } from '../types';
import axiosClient from './axiosClient';

const categoryApi = {
  get(): Promise<ICategory[]> {
    const url = '/cate';
    return axiosClient.get(url);
  },
  create(name: any): Promise<any> {
    const url = '/cate';
    return axiosClient.post(url, { name });
  },
  delete(id: string): Promise<any> {
    const url = `/cate/${id}`;
    return axiosClient.delete(url);
  },
  update(name: string, id: string): Promise<any> {
    const url = `/cate/${id}`;
    return axiosClient.patch(url, { name });
  },
};

export default categoryApi;
