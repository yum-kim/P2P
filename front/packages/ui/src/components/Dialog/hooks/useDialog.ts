"use client";

import { createContext, useContext } from "react";
import { DialogContextType } from "../service/DialogService.type";

export const DialogContext = createContext<DialogContextType | null>(null);

export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog가 DialogProvider 내에 있지 않아요.");
  }

  return context;
};
