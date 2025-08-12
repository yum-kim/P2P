import Logo from "../../images/logo.svg";

import { IconProps } from "./icon.type";

export const image = {
  Logo,
};

export const Icon = ({ icon: iconComponent, size, ...props }: IconProps) => {
  const SvgIcon = image[iconComponent];

  if (!SvgIcon) return null;

  return (
    <>
      <SvgIcon {...props} width={size} height={size} />
    </>
  );
};
