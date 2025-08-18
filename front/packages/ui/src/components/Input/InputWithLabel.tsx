import React, { forwardRef } from "react";
import clsx from "clsx";
import { InputWithLabelProps } from "./Input.type";

export const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    {
      children,
      label,
      value,
      isInvalid = false,
      errMsg,
      type = "text",
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-y-[4px] w-full">
        <label htmlFor={label} className="text-gray-900 text-p2p-14">
          {children}
        </label>
        <div
          className={clsx(
            "outline outline-1 -outline-offset-1  has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 rounded-md h-[35px] flex items-center pl-3",
            isInvalid
              ? "outline-p2p-red has-[input:focus-within]:outline-p2p-red"
              : "outline-p2p-tertiary has-[input:focus-within]:outline-p2p-purple"
          )}
        >
          <input
            ref={ref}
            autoComplete="off"
            id={label}
            type={type}
            value={value}
            className={clsx("pr-3 block grow", className ?? "")}
            {...rest}
          />
        </div>
        {errMsg && <p className="text-p2p-red">{errMsg}</p>}
      </div>
    );
  }
);
