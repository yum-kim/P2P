'use client';

import apiRequest from '@/service/api/apiClient';
import useAuthStore, { AuthUser } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ContainedButton, Dialog, Icon, InputWithLabel, useDialog } from 'p2p-ui';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface LoginFormInput {
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { showDialog, hideDialog } = useDialog();
  const { login, isLoggedIn } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const onInvalidSubmit = () => {
    if (Object.keys(errors).length > 0) {
      showDialog({
        id: 'validation-fail',
        content: '모든 필수값을 올바르게 입력해주세요.',
        actions: <ContainedButton onClick={() => hideDialog('validation-fail')}>확인</ContainedButton>,
      });
      return;
    }
  };

  const onValidSubmit = async (formData: LoginFormInput) => {
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
            isInvalid={!!errors.username}
            errMsg={errors.username?.message}
            {...register('username', {
              required: '사용자 이름을 입력해주세요.',
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: '사용자 이름은 영문 혹은 숫자로 입력해주세요.',
              },
            })}
          >
            Username
          </InputWithLabel>
          <InputWithLabel
            label="password"
            type="password"
            isInvalid={!!errors.password}
            errMsg={errors.password?.message}
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
          >
            Password
          </InputWithLabel>
        </div>
        <div className="w-full flex flex-col gap-y-[10px]">
          <ContainedButton className="w-full" color="purple" onClick={handleSubmit(onValidSubmit, onInvalidSubmit)}>
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
