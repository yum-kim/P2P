import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

type Validator = (value: string) => string | null;

interface UseInputResult {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: Dispatch<SetStateAction<string>>;
  errorMsg: string | null;
  isInvalid: boolean;
  validate: () => boolean;
  reset: () => void;
}

const useInput = (initialValue: string, validator?: Validator): UseInputResult => {
  const [value, setValue] = useState<string>(initialValue);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    //값 변경 시 마다 유효성 검증
    if (validator) {
      setErrorMsg(validator(newValue));
    }
  };

  //유효성검증 직접 실행
  const validate = () => {
    if (validator) {
      const errMsg = validator(value);
      setErrorMsg(errMsg);
      return !errMsg; //에러가 있는지 없는지에 따라 boolean 반환
    }
    return true;
  };

  const reset = () => {
    setValue(initialValue);
    setErrorMsg(null);
  };

  return { value, onChange, setValue, errorMsg, isInvalid: !!errorMsg, validate, reset };
};

export default useInput;
