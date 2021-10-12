import axios from 'axios';

const addressApi = {
  province(): Promise<any> {
    const url = 'https://vapi.vnappmob.com/api/province';
    return axios.get(url);
  },
  district(provinceid: string): Promise<any> {
    const url = `https://vapi.vnappmob.com/api/province/district/${provinceid}`;
    return axios.get(url);
  },
  ward(districtId: string): Promise<any> {
    const url = `https://vapi.vnappmob.com/api/province/ward/${districtId}`;
    return axios.get(url);
  },
};

export default addressApi;
