import axiosClient from './axiosClient';

export interface StatusPayment {
  paymentID: string;
  status: string;
}

const paymentApi = {
  createRequestOnline(formvalue: any): Promise<any> {
    const url = '/payment/request';
    return axiosClient.post(url, formvalue);
  },
  createRequestOffline(formvalue: any): Promise<any> {
    const url = '/payment/createPayPaid';
    return axiosClient.post(url, formvalue);
  },
  getOrderHistory(): Promise<any> {
    const url = '/payment/order_history';
    return axiosClient.get(url);
  },
  getAllOrder(): Promise<any> {
    const url = '/payment/getAllOrder';
    return axiosClient.get(url);
  },
  changeStatus(stateValue: StatusPayment): Promise<any> {
    const url = '/payment/status';
    return axiosClient.patch(url, stateValue);
  },
};

export default paymentApi;
