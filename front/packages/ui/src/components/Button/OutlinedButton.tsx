import clsx from "clsx";
import { Spinner } from "../Spinner/Spinner";
import { ButtonProps } from "./Button.type";

const colorThemes = {
  purple: {
    text: "text-p2p-purple",
    outline: "outline-p2p-purple focus:outline-p2p-purple",
  },
  black: {
    text: "text-p2p-black",
    outline: "outline-p2p-black focus:outline-p2p-black",
  },
};

export const OutlinedButton = ({
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
        "flex gap-x-[10px] text-p2p-16 items-center rounded-md px-[10px] py-[8px] justify-center disabled:bg-p2p-secondary bg-p2p-white outline-1 outline focus:outline focus:outline-1 transition duration-100",
        theme.outline,
        className
      )}
      {...props}
    >
      <div>{loading && <Spinner />}</div>
      <div className={theme.text}>{children}</div>
    </button>
  );
};
