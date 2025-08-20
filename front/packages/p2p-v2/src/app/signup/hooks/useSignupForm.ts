import useInput from '@/hooks/useInput';
import { useCallback } from 'react';

const useSignupForm = () => {
  const validateUsername = useCallback((username: string) => {
    if (typeof username !== 'string' || !username.trim()) return '빈 값을 입력해주세요.';
    if (!/^[a-zA-Z0-9]+$/.test(username.trim())) return '사용자 이름은 영문 혹은 숫자로 입력해주세요.';
    return null;
  }, []);

  const validateNickname = useCallback((nickname: string) => {
    if (!nickname.trim()) return null;
    if (nickname.trim() && !/^[가-힣a-zA-Z0-9]{1,8}$/.test(nickname.trim())) {
      return '닉네임은 8자 이하의 한글, 영문, 숫자로 입력해주세요.';
    }
    return null;
  }, []);

  const validatePassword = useCallback((password: string) => {
    if (typeof password !== 'string' || !password.trim()) return '빈 값을 입력해주세요.';
    return null;
  }, []);

  const validateConfirmPassword = (confirmPassword: string) => {
    if (typeof confirmPassword !== 'string' || !confirmPassword.trim()) return '빈 값을 입력해주세요.';
    if (passwordInput.value !== confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    return null;
  };

  const usernameInput = useInput('', validateUsername);
  const nicknameInput = useInput('', validateNickname);
  const passwordInput = useInput('', validatePassword);
  const confirmPasswordInput = useInput('', validateConfirmPassword);

  const validateAll = useCallback(() => {
    const isUsernameValid = usernameInput.validate();
    const isNicknameValid = nicknameInput.validate();
    const isPasswordValid = passwordInput.validate();
    const isConfirmPasswordValid = confirmPasswordInput.validate();

    return isUsernameValid && isNicknameValid && isPasswordValid && isConfirmPasswordValid;
  }, [usernameInput, nicknameInput, passwordInput, confirmPasswordInput]);

  const getFormData = () => {
    return { username: usernameInput.value, usercode: nicknameInput.value, password: passwordInput.value };
  };

  return {
    username: usernameInput.value,
    onChangeUsername: usernameInput.onChange,
    isUsernameInvalid: usernameInput.isInvalid,
    usernameErrorMsg: usernameInput.errorMsg,
    validateUsernameInput: usernameInput.validate,

    nickname: nicknameInput.value,
    onChangeNickname: nicknameInput.onChange,
    isNicknameInvalid: nicknameInput.isInvalid,
    nicknameErrorMsg: nicknameInput.errorMsg,
    validateNicknameInput: nicknameInput.validate,

    password: passwordInput.value,
    onChangePassword: passwordInput.onChange,
    isPasswordInvalid: passwordInput.isInvalid,
    passwordErrorMsg: passwordInput.errorMsg,
    validatePasswordInput: passwordInput.validate,

    confirmPassword: confirmPasswordInput.value,
    onChangeConfirmPassword: confirmPasswordInput.onChange,
    isConfirmPasswordInvalid: confirmPasswordInput.isInvalid,
    confirmPasswordErrorMsg: confirmPasswordInput.errorMsg,
    validateConfirmPasswordInput: confirmPasswordInput.validate,

    validateAll,
    getFormData,
  };
};

export default useSignupForm;
