import clsx from "clsx";
import { Spinner } from "../Spinner/Spinner";
import { ButtonProps } from "./Button.type";

export const OutlinedButton = ({
  children,
  color = "purple",
  loading = false,
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  const textColor = color === "purple" ? "text-p2p-purple" : "text-p2p-black";
  const outlineColor =
    color === "purple"
      ? "outline-p2p-purple focus:outline-p2p-purple"
      : "outline-p2p-black focus:outline-p2p-black";

  return (
    <button
      disabled={loading || disabled}
      className={clsx(
        "flex gap-x-[10px] text-p2p-16 items-center rounded-md px-[10px] py-[8px] justify-center disabled:bg-p2p-secondary bg-p2p-white outline-1 outline focus:outline focus:outline-1",
        outlineColor,
        className
      )}
      {...props}
    >
      <div>{loading && <Spinner />}</div>
      <div className={textColor}>{children}</div>
    </button>
  );
};
