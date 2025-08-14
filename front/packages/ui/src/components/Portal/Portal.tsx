import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { PortalProps } from "./Portal.type";

export const Portal = ({ children, style, container }: PortalProps) => {
  const portal = useMemo(() => document.createElement("div"), []);

  useLayoutEffect(() => {
    Object.assign(portal.style, style);
  }, [portal, style]);

  useEffect(() => {
    const parent = container || document.body;

    if (parent instanceof HTMLElement) {
      parent.appendChild(portal);
    }

    return () => {
      if (parent.contains(portal)) {
        parent.removeChild(portal);
      }
    };
  }, [portal, container]);

  return createPortal(children, portal);
};
