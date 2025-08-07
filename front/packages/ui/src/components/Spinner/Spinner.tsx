import clsx from "clsx";
import { SpinnerProps } from "./Spinner.type";

export const Spinner = ({
  size = 24,
  color = "white",
  ...props
}: SpinnerProps) => {
  const numericSize = typeof size === "string" ? parseInt(size, 10) : size;

  const getTailwindColorName = () => {
    switch (color) {
      case "blue":
        return "text-p2p-blue";
      case "white":
        return "text-p2p-white";
      case "gray":
        return "text-p2p-tertiary";
    }
  };

  return (
    <svg
      className={clsx("animate-spin", getTailwindColorName())}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ width: numericSize, height: numericSize }}
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
};
