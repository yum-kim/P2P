import { InputHTMLAttributes } from "react";

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  type?: string;
  isInvalid?: boolean;
  errMsg?: string | null;
}

export interface InputWithLabelProps extends InputBaseProps {
  label: string;
}
