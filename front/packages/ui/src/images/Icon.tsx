import Logo from "./logo.svg";
import { IconProps } from "./icon.type";

export const image = {
  Logo,
};

export const Icon = ({ icon: iconComponent, ...props }: IconProps) => {
  const SvgIcon = image[iconComponent];

  if (!SvgIcon) return null;

  return (
    <>
      <SvgIcon {...props} />
    </>
  );
};
