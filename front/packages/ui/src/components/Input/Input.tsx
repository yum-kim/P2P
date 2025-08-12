import React, { forwardRef } from "react";
import clsx from "clsx";
import { InputBaseProps } from "./Input.type";

export const Input = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      isInvalid = false,
      type = "text",
      className,
      inputProps,
      placeholder,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-y-[4px] w-full">
        <div
          className={clsx(
            "outline outline-1 -outline-offset-1 outline-p2p-tertiary has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-p2p-purple rounded-md flex items-center py-[4px] pl-3",
            isInvalid &&
              "outline-p2p-red has-[input:focus-within]:outline-p2p-red",
            className
          )}
        >
          <input
            ref={ref}
            autoComplete="off"
            placeholder={placeholder}
            type={type}
            className={clsx("pr-3 block grow", inputProps?.className ?? "")}
            {...rest}
          />
        </div>
      </div>
    );
  }
);
