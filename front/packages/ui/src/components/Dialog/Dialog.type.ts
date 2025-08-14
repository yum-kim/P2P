import { HTMLAttributes } from "react";

export interface DialogContainerProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export interface DialogTitleProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}
