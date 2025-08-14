import { ReactNode } from "react";

export type DialogId = string;

// show Dialog 함수가 받을 다이어로그 옵션들
export interface DialogOptions {
  title?: ReactNode;
  content: ReactNode;
  actions?: ReactNode;
  id?: DialogId;
}

export interface DialogContextType {
  showDialog: (options: DialogOptions) => void;
  hideDialog: (id: DialogId) => void;
}

export interface ActiveDialog extends DialogOptions {
  id: DialogId;
}
