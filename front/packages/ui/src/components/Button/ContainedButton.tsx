import clsx from "clsx";
import { Spinner } from "../Spinner/Spinner";
import { ButtonProps } from "./Button.type";

export const ContainedButton = ({
  children,
  color = "purple",
  loading = false,
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const themeBgColor = color === "purple" ? "bg-p2p-purple" : "bg-p2p-white";
  const themeTextColor =
    color === "purple" ? "text-p2p-background" : "text-p2p-black";

  return (
    <button
      disabled={loading || disabled}
      className={clsx(
        "flex gap-x-[10px] bg-p2p- text-p2p-16 items-center rounded-md px-[10px] py-[8px] justify-center hover:bg-p2p-purple-dark hover:transition-colors hover:duration-100 disabled:bg-p2p-secondary",
        themeBgColor,
        className
      )}
      {...props}
    >
      <div>{loading && <Spinner />}</div>
      <div className={themeTextColor}>{children}</div>
    </button>
  );
};
