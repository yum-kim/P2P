import { ChangeEvent, Dispatch, InputHTMLAttributes, SetStateAction, useState } from 'react';

export type InputValueType = InputHTMLAttributes<HTMLInputElement>['value'];

type Validator = (value: InputValueType) => string | null;

interface UseInputResult {
  value: InputValueType;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValue: Dispatch<SetStateAction<InputValueType>>;
  errorMsg: string | null;
  isInvalid: boolean;
  validate: () => boolean;
  reset: () => void;
}

const useInput = (initialValue: InputValueType, validator?: Validator): UseInputResult => {
  const [value, setValue] = useState<InputValueType>(initialValue);
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
