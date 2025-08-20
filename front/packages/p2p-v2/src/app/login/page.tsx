'use client';

import apiRequest from '@/service/api/apiClient';
import useAuthStore, { AuthUser } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ContainedButton, Dialog, Icon, InputWithLabel, useDialog } from 'p2p-ui';
import { useEffect } from 'react';
import useLoginForm from './hooks/useLoginForm';

export default function Login() {
  const router = useRouter();
  const { showDialog, hideDialog } = useDialog();
  const { login, isLoggedIn } = useAuthStore();
  const {
    username,
    password,
    onChangeUsername,
    onChangePassword,
    isUsernameInvalid,
    isPasswordInvalid,
    usernameErrorMsg,
    passwordErrorMsg,
    validateAll,
    getFormData,
  } = useLoginForm();

  const onClickLogin = async () => {
    const isValid = validateAll();
    if (!isValid) {
      showDialog({
        id: 'validation-fail',
        content: '모든 필수값을 올바르게 입력해주세요.',
        actions: <ContainedButton onClick={() => hideDialog('validation-fail')}>확인</ContainedButton>,
      });
      return;
    }

    const formData = getFormData();
    await apiRequest.post('/auth/signin', formData, null, {
      success: (data: AuthUser) => {
        login(data);
      },
      error: (message: string) => {
        showDialog({
          id: 'login-fail',
          content: message,
          actions: <Dialog.ContainedButton onClick={() => hideDialog('login-fail')}>확인</Dialog.ContainedButton>,
        });
      },
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      //app>(main)>page.tsx
      router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-[20px]">
      <div className="w-full max-w-[400px] flex flex-col items-center p-[10px] gap-y-[20px]">
        <Icon icon="Logo" size={70} />
        <div className="w-full flex flex-col gap-y-[20px]">
          <InputWithLabel
            label="username"
            value={username}
            onChange={onChangeUsername}
            isInvalid={isUsernameInvalid}
            errMsg={usernameErrorMsg}
          >
            Username
          </InputWithLabel>
          <InputWithLabel
            label="password"
            value={password}
            onChange={onChangePassword}
            type="password"
            isInvalid={isPasswordInvalid}
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
