import React, { forwardRef } from "react";
import clsx from "clsx";
import { TextareaProps } from "./Textarea.type";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ isInvalid = false, className, ...rest }, ref) => {
    return (
      <div className={className}>
        <div
          className={clsx(
            "outline outline-1 -outline-offset-1 outline-p2p-border has-[textarea:focus-within]:outline-2 has-[textarea:focus-within]:-outline-offset-2 has-[textarea:focus-within]:outline-p2p-purple rounded-[4px] px-[10px] py-[6px] bg-p2p-white",
            isInvalid &&
              "outline-p2p-red has-[textarea:focus-within]:outline-p2p-red"
          )}
        >
          <textarea
            ref={ref}
            className={clsx("block resize-none w-full h-[100px]")}
            {...rest}
          />
        </div>
      </div>
    );
  }
);
