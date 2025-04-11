import Logo from "./logo.svg";
import { IconProps } from "./icon.type";

export const image = {
  Logo,
};

export const Icon = ({
  icon: iconComponent,
  size = 24,
  fillRule = "evenodd",
  viewBox = "0 0 24 24",
  ...props
}: IconProps) => {
  const SvgIcon = image[iconComponent];

  console.log("svgIcon", SvgIcon);
  console.log("요청된 아이콘:", iconComponent);
  console.log("실제 컴포넌트:", SvgIcon);

  if (!SvgIcon) return null;

  return (
    <>
      <SvgIcon
        width={size}
        height={size}
        fillRule={fillRule}
        viewBox={viewBox}
        {...props}
      />
    </>
  );
};
