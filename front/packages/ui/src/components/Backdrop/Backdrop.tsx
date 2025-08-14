import React from "react";
import { BackdropProps } from "./Backdrop.type";

export const Backdrop = ({ children, onClick }: BackdropProps) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center w-screen h-screen"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
