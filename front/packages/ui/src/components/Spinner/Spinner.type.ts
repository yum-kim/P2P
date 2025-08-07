import { SVGProps } from "react";

export interface SpinnerProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: "blue" | "gray" | "white";
}
