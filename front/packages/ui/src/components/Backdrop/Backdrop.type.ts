import React, { HTMLAttributes } from "react";

export interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: (e: React.MouseEvent) => void;
}
