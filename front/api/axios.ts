import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';
import axios, { AxiosRequestConfig } from 'axios';
import auth from './auth';
import { issueAccessTokenRequest, signUpInit, logOutRequest } from '../store/slices/auth';
import { store } from '../store/configureStore';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'X-Custom-Header': 'foobar' },
  withCredentials: true,
  timeout: 5000,
});

interface IOptionProps extends AxiosRequestConfig {
  "method": string,
  "url": string,
  "headers": {
    "Content-type": string,
  },
  "params"?: any,
  "data"?: any
}

export default async function request(option: IOptionProps) {
  try {
    const accessToken = auth.getToken();

    if (accessToken) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    const res:any = await axiosInstance(option);

    console.log('request response', res);

    try {
      return await validateResponse(res, option);
    } catch (e) {
      throw new Error(e);
    }

  } catch (e) {
    return { error: e.response.data };
  }
}

async function validateResponse(res:any, option: IOptionProps) {
  const status = res.statusCode ?? res.status;
  const { error } = res;
  
  //요청 성공 처리
  if ([200, 201].includes(status)) {
    return { res: res.data };
  }

  //요청 실패 처리
  if (status == 401) {
    
    //TODO:권한 오류별 처리 추가
    switch (error) {
      case "액세스 토큰 만료":
        store.dispatch(issueAccessTokenRequest());
        return await request(option); //재요청
      case "리프레쉬 토큰 만료":
        store.dispatch(logOutRequest(error));
        return;
    }
  }

  throw new Error(res);
}