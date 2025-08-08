import clsx from "clsx";
import { Spinner } from "../Spinner/Spinner";
import { ButtonProps } from "./Button.type";

const colorThemes = {
  purple: {
    bg: "bg-p2p-purple",
    text: "text-p2p-background",
    hoverBg: "hover:bg-p2p-purple-dark",
  },
  black: {
    bg: "bg-p2p-black",
    text: "text-p2p-white",
    hoverBg: "hover:bg-p2p-dark",
  },
};

export const ContainedButton = ({
  children,
  color = "purple",
  loading = false,
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const theme = colorThemes[color];

  return (
    <button
      disabled={loading || disabled}
      className={clsx(
        "flex gap-x-[10px] bg-p2p- text-p2p-16 items-center rounded-md px-[10px] py-[8px] justify-center hover:bg-p2p-purple-dark hover:transition-colors hover:duration-100 disabled:bg-p2p-secondary",
        theme.bg,
        theme.hoverBg,
        className
      )}
      {...props}
    >
      <div>{loading && <Spinner />}</div>
      <div className={theme.text}>{children}</div>
    </button>
  );
};
