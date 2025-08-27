'use client';

import apiRequest from '@/service/api/apiClient';
import useAuthStore, { AuthUser } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ContainedButton, Dialog, Icon, InputWithLabel, useDialog } from 'p2p-ui';
import { useForm } from 'react-hook-form';

interface SignupFormInput {
  username: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export default function page() {
  const router = useRouter();
  const { showDialog, hideDialog } = useDialog();
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInput>();

  const onInValidSubmit = async () => {
    if (Object.keys(errors).length > 0) {
      showDialog({
        id: 'signup-validation-fail',
        content: '모든 필수값을 올바르게 입력해주세요.',
        actions: <ContainedButton onClick={() => hideDialog('signup-validation-fail')}>확인</ContainedButton>,
      });
    }
  };

  const onValidSubmit = async (formData: SignupFormInput) => {
    await apiRequest.post('/auth/signup', formData, null, {
      success: (data: AuthUser) => {
        login(data);
        showDialog({
          id: 'signup-success',
          content: '회원가입에 성공했습니다. 로그인 화면으로 이동하시겠습니까?',
          actions: (
            <>
              <Dialog.OutlinedButton onClick={() => hideDialog('signup-success')}>아니오</Dialog.OutlinedButton>
              <Dialog.ContainedButton
                onClick={() => {
                  hideDialog('signup-success');
                  router.push('/login');
                }}
              >
                예
              </Dialog.ContainedButton>
            </>
          ),
        });
      },
      error: (message: string) => {
        showDialog({
          id: 'signup-fail',
          content: message,
          actions: <Dialog.ContainedButton onClick={() => hideDialog('signup-fail')}>확인</Dialog.ContainedButton>,
        });
      },
    });
  };

  const onClickLoginButton = () => {
    showDialog({
      id: 'move-login',
      content: '회원가입을 중단하고 로그인 화면으로 이동하시겠습니까?',
      actions: (
        <>
          <Dialog.OutlinedButton onClick={() => hideDialog('move-login')}>닫기</Dialog.OutlinedButton>
          <Dialog.ContainedButton onClick={() => router.push('/login')}>예</Dialog.ContainedButton>
        </>
      ),
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-y-[20px]">
      <Icon icon="Logo" size={70} />
      <div className="w-full max-w-[400px] flex flex-col items-center p-[10px]">
        <div className="w-full flex flex-col gap-y-[20px] pb-[30px]">
          <InputWithLabel
            label="username"
            isInvalid={!!errors.username}
            errMsg={errors.username?.message}
            {...register('username', {
              required: '사용자 이름을 입력해주세요',
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: '사용자 이름은 영문 혹은 숫자로 입력해주세요.',
              },
            })}
          >
            Username
          </InputWithLabel>
          <div>
            <InputWithLabel
              label="nickname"
              isInvalid={!!errors.nickname}
              errMsg={errors.nickname?.message}
              {...register('nickname', {
                pattern: {
                  value: /^[가-힣a-zA-Z0-9]{1,8}$/,
                  message: '닉네임은 8자 이하의 한글, 영문, 숫자로 입력해주세요.',
                },
              })}
            >
              Nickname
            </InputWithLabel>
            {!errors.nickname?.message && (
              <span className="text-p2p-red pt-[8px] block">빈 값으로 제출 시 닉네임이 자동 생성됩니다.</span>
            )}
          </div>
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
          <InputWithLabel
            label="confirmPassword"
            type="password"
            isInvalid={!!errors.passwordConfirm}
            errMsg={errors.passwordConfirm?.message}
            {...register('passwordConfirm', {
              required: '빈 값을 입력해주세요.',
            })}
          >
            Confirm Password
          </InputWithLabel>
          <ContainedButton className="w-full" onClick={handleSubmit(onValidSubmit, onInValidSubmit)}>
            Sign up
          </ContainedButton>
        </div>
        <div className="w-full flex flex-col gap-y-[8px]">
          <span className="w-full text-p2p-secondary">이미 가입된 계정이 있으신가요?</span>
          <Link href="/login" className="block w-full">
            <ContainedButton color="black" className="w-full" onClick={onClickLoginButton}>
              Login
            </ContainedButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
