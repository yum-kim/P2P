import React, { PropsWithChildren } from "react";

const DialogContent = ({ children }: PropsWithChildren) => {
  return (
    <div className="pt-[20px] pb-[24px] text-center text-p2p-14">
      {children}
    </div>
  );
};

export default DialogContent;
