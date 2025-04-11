import { SVGProps } from "react";
import { image } from "./Icon";

type IconName = keyof typeof image;

export interface IconProps extends SVGProps<SVGSVGElement> {
  icon: IconName;
  size?: number;
  // fillRule?: "nonzero" | "evenodd" | "inherit";
  viewBox?: string;
}
