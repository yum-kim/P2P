import React, { ButtonHTMLAttributes } from "react";

type ButtonColor = "purple" | "black";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  loading?: boolean;
}
