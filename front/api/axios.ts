import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';
import axios, { AxiosRequestConfig } from 'axios';
import auth from './auth';
import { issueAccessTokenRequest, signUpInit, logOutRequest } from '../store/slices/auth';
import { store } from '../store/configureStore';
import { getCookie } from '../utils/cookie';

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

export default async function request(option: IOptionProps) {
  try {
    const accessToken = auth.getToken();
    const refreshToken = getCookie('P2P|refreshToken');

    if (accessToken) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    //accessToken 재발급 시 refreshToken으로 인증
    if (option.url == '/auth/access-token') {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`;
    }

    const res:any = await axiosInstance(option);

    //요청 성공 처리
    const status = res.statusCode ?? res.status;
    if ([200, 201].includes(status)) {
      return { res: res.data };
    }
    console.log('request response', res);
    
    throw new Error(res);
  } catch (e) {
    const { data: error } = e.response;
    return await checkErrorType(error, option);
  }
}

async function checkErrorType(error:any, option: IOptionProps) {
  const status = error.statusCode ?? error.status;
  const { message } = error;
  
  //요청 실패 처리
  if (status == 401) {
    switch (message) {
      case "Token 전송 안됨": ;
      case "토큰이 만료되었습니다.":
        store.dispatch(issueAccessTokenRequest());
        return await request(option); //재요청
      case "refresh 토큰이 만료되었습니다.":
        store.dispatch(logOutRequest(message));
        return;
    }
  }

  return { error };
}