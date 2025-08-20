import useInput from '@/hooks/useInput';
import React, { useCallback } from 'react';

const useLoginForm = () => {
  const validateUsername = useCallback((username: string) => {
    if (typeof username !== 'string' || !username.trim()) return '빈 값을 입력해주세요.';
    if (!/^[a-zA-Z0-9]+$/.test(username.trim())) return '사용자 이름은 영문 혹은 숫자로 입력해주세요.';
    return null;
  }, []);

  const validatePassword = useCallback((password: string) => {
    if (typeof password !== 'string' || !password.trim()) return '빈 값을 입력해주세요.';
    return null;
  }, []);

  const usernameInput = useInput('', validateUsername);
  const passwordInput = useInput('', validatePassword);

  const getFormData = () => {
    return { username: usernameInput.value, password: passwordInput.value };
  };

  const validateAll = useCallback(() => {
    const isUsernameValid = usernameInput.validate();
    const isPasswordValid = passwordInput.validate();
    return isUsernameValid && isPasswordValid;
  }, [usernameInput, passwordInput]);

  return {
    username: usernameInput.value,
    password: passwordInput.value,
    onChangeUsername: usernameInput.onChange,
    onChangePassword: passwordInput.onChange,
    isUsernameInvalid: usernameInput.isInvalid,
    isPasswordInvalid: passwordInput.isInvalid,
    usernameErrorMsg: usernameInput.errorMsg,
    passwordErrorMsg: passwordInput.errorMsg,
    validateAll,
    getFormData,
  };
};

export default useLoginForm;
