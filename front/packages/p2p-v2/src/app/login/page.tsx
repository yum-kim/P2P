'use client';

import useInput from '@/hooks/useInput';
import apiRequest from '@/service/api/apiClient';
import AuthService from '@/service/api/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ContainedButton, Icon, InputWithLabel, useDialog } from 'p2p-ui';
import { useCallback } from 'react';

export default function Login() {
  const router = useRouter();
  const { showDialog, hideDialog } = useDialog();

  const validateUsername = useCallback((username: string) => {
    if (typeof username !== 'string' || !username.trim()) return '빈 값을 입력해주세요.';
    if (!/^[a-zA-Z0-9]+$/.test(username.trim())) return '사용자 이름은 영문 혹은 숫자로 입력해주세요.';
    return null;
  }, []);

  const validatePassword = useCallback((password: string) => {
    if (typeof password !== 'string' || !password.trim()) return '빈 값을 입력해주세요.';
    return null;
  }, []);

  const {
    value: username,
    onChange: onChangeUsername,
    isInvalid: isInValidUsername,
    errorMsg: usernameErrorMsg,
    validate: validateUsernameInput,
  } = useInput('', validateUsername);
  const {
    value: password,
    onChange: onChangePassword,
    isInvalid: isInValidPassword,
    errorMsg: passwordErrorMsg,
    validate: validatePasswordInput,
  } = useInput('', validatePassword);

  const onClickLogin = async () => {
    const isUsernameValid = validateUsernameInput();
    const isPasswordValid = validatePasswordInput();

    if (!isUsernameValid || !isPasswordValid) {
      showDialog({
        id: 'validation-fail',
        content: '모든 필수값을 올바르게 입력해주세요.',
        actions: <ContainedButton onClick={() => hideDialog('validation-fail')}>확인</ContainedButton>,
      });
      return;
    }

    const data = await apiRequest.post('/auth/login', { username, password }, undefined, {
      error: (message: string) => {
        showDialog({
          id: 'login-fail',
          content: message,
          actions: <ContainedButton onClick={() => hideDialog('login-fail')}>확인</ContainedButton>,
        });
      },
    });

    if (data) {
      //app>(main)>page.tsx
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-[20px]">
      <div className="w-full max-w-[400px] flex flex-col items-center p-[10px] gap-y-[20px]">
        <Icon icon="Logo" size={70} />
        <div className="w-full flex flex-col gap-y-[20px]">
          <InputWithLabel
            label="username"
            value={username}
            onChange={onChangeUsername}
            isInvalid={isInValidUsername}
            errMsg={usernameErrorMsg}
          >
            Username
          </InputWithLabel>
          <InputWithLabel
            label="password"
            value={password}
            onChange={onChangePassword}
            type="password"
            isInvalid={isInValidPassword}
            errMsg={passwordErrorMsg}
          >
            Password
          </InputWithLabel>
        </div>
        <div className="w-full flex flex-col gap-y-[10px]">
          <ContainedButton className="w-full" color="purple" onClick={onClickLogin}>
            Login
          </ContainedButton>
          <Link href="/signup">
            <ContainedButton className="w-full" color="black">
              Sign Up
            </ContainedButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
