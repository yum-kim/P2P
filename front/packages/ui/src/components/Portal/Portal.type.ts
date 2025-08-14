import { CSSProperties, PropsWithChildren } from "react";

export interface PortalProps extends PropsWithChildren {
  style?: CSSProperties;
  container?: HTMLElement;
}
