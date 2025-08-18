import { InputHTMLAttributes } from "react";

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  type?: string;
  isInvalid?: boolean;
  errMsg?: string | null;
  value: string;
}

export interface InputWithLabelProps extends InputBaseProps {
  label: string;
}
