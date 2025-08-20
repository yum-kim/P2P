'use client';

import apiRequest from '@/service/api/apiClient';
import useAuthStore, { AuthUser } from '@/store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ContainedButton, Dialog, Icon, InputWithLabel, useDialog } from 'p2p-ui';
import useSignupForm from './hooks/useSignupForm';

export default function page() {
  const router = useRouter();
  const { showDialog, hideDialog } = useDialog();
  const { login } = useAuthStore();
  const {
    username,
    nickname,
    password,
    confirmPassword,
    onChangeUsername,
    onChangeNickname,
    onChangePassword,
    onChangeConfirmPassword,
    isUsernameInvalid,
    isNicknameInvalid,
    isPasswordInvalid,
    isConfirmPasswordInvalid,
    usernameErrorMsg,
    nicknameErrorMsg,
    passwordErrorMsg,
    confirmPasswordErrorMsg,
    validateAll,
    getFormData,
  } = useSignupForm();

  const onClickSignup = async () => {
    const isValid = validateAll();
    if (!isValid) {
      showDialog({
        id: 'signup-validation-fail',
        content: '모든 필수값을 올바르게 입력해주세요.',
        actions: <ContainedButton onClick={() => hideDialog('signup-validation-fail')}>확인</ContainedButton>,
      });
      return;
    }

    const formData = getFormData();
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
            value={username}
            onChange={onChangeUsername}
            isInvalid={isUsernameInvalid}
            errMsg={usernameErrorMsg}
          >
            Username
          </InputWithLabel>
          <div>
            <InputWithLabel
              label="nickname"
              value={nickname}
              onChange={onChangeNickname}
              isInvalid={isNicknameInvalid}
              errMsg={nicknameErrorMsg}
            >
              Nickname
            </InputWithLabel>
            <span className="text-p2p-red pt-[8px] block">빈 값으로 제출 시 닉네임이 자동 생성됩니다.</span>
          </div>
          <InputWithLabel
            label="password"
            type="password"
            value={password}
            onChange={onChangePassword}
            isInvalid={isPasswordInvalid}
            errMsg={passwordErrorMsg}
          >
            Password
          </InputWithLabel>
          <InputWithLabel
            label="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            isInvalid={isConfirmPasswordInvalid}
            errMsg={confirmPasswordErrorMsg}
          >
            Confirm Password
          </InputWithLabel>
          <ContainedButton className="w-full" onClick={onClickSignup}>
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
