import axios from 'axios';
import auth from './auth';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'X-Custom-Header': 'foobar' },
  timeout: 5000,
});

interface IOptionProps {
  "method": string,
  "url": string,
  "headers": {
    "Content-type": string,
  },
  "params"?: any,
  "data"?: any
}

async function request(option: IOptionProps) {
  try {
    const accessToken = auth.getToken();

    if (accessToken) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    const res:any = await axiosInstance(option);

    console.log('request response');
    console.log(res);

    if (![200,201].includes(res.status)) {
      throw new Error(res);
    }

    return { res: res.data };
  } catch (e) {
    return { error: e.response.data };
  }
}

export default request;