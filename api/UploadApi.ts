import axiosClient from './axiosClient';

const uploadApi = {
  uploadImg(formdata: FormData): Promise<any> {
    const url = '/api/upload';
    return axiosClient.post(url, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteImg(public_id: any): Promise<any> {
    const url = '/api/delImg';
    return axiosClient.post(url, { public_id });
  },
};

export default uploadApi;
