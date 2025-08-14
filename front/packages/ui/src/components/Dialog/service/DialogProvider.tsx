"use client";

import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { DialogContext } from "../hooks/useDialog";
import { ActiveDialog, DialogId, DialogOptions } from "./DialogService.type";
import { v4 as uuidv4 } from "uuid";
import { Dialog } from "../Dialog";

export const DialogProvider = ({ children }: PropsWithChildren) => {
  const [activeDialogs, setActiveDialogs] = useState<ActiveDialog[]>([]);

  const showDialog = useCallback(
    (options: DialogOptions) => {
      const DialogId = options.id || uuidv4();
      if (activeDialogs.some((d) => d.id === DialogId)) {
        console.warn(`Id:${DialogId} Dialog가 이미 있어요!`);
        return;
      }

      const newDialog: ActiveDialog = {
        ...options,
        id: DialogId,
      };

      setActiveDialogs((prev) => [...prev, newDialog]);
    },
    [activeDialogs]
  );

  const hideDialog = useCallback((id: DialogId) => {
    const newDialogs = activeDialogs.filter((dialog) => dialog.id !== id);
    setActiveDialogs(newDialogs);
  }, []);

  const contextValue = useMemo(
    () => ({
      showDialog,
      hideDialog,
    }),
    [showDialog, hideDialog]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}

      {/* 활성화된 Dialog들 */}
      {activeDialogs.map((dialog) => (
        <Dialog
          key={dialog.id}
          onClose={() => {
            hideDialog(dialog.id);
          }}
        >
          {dialog.title && (
            <Dialog.Title
              onClose={() => {
                hideDialog(dialog.id);
              }}
            >
              {dialog.title}
            </Dialog.Title>
          )}
          <Dialog.Content>{dialog.content}</Dialog.Content>
          {dialog.actions && <Dialog.Action>{dialog.actions}</Dialog.Action>}
        </Dialog>
      ))}
    </DialogContext.Provider>
  );
};
