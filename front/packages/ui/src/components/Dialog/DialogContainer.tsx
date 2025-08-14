"use client";

import React from "react";
import { DialogContainerProps } from "./Dialog.type";
import { Portal } from "../Portal";
import { Backdrop } from "../Backdrop";

const DialogContainer = ({
  children,
  onClose: _onClose,
}: DialogContainerProps) => {
  const onClose = () => {
    _onClose?.();
  };

  const handleBackDropClick = (e: React.MouseEvent) => {
    // 이벤트가 정확히 오버레이 자체에서 발생했을 때만 onClose 호출
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
      }}
    >
      <Backdrop onClick={handleBackDropClick}>
        <div className="bg-p2p-white rounded-[12px] p-[20px] shadow w-[320px]">
          {children}
        </div>
      </Backdrop>
    </Portal>
  );
};

export default DialogContainer;
