import React, { PropsWithChildren } from "react";

const DialogAction = ({ children }: PropsWithChildren) => {
  return <div className="flex justify-center gap-x-[10px]">{children}</div>;
};

export default DialogAction;
