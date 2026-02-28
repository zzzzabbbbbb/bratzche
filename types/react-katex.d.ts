declare module "react-katex" {
  import type { ComponentType } from "react";

  type KatexProps = {
    math: string;
    errorColor?: string;
    renderError?: (error: Error) => unknown;
    blockClassName?: string;
    className?: string;
    children?: never;
  };

  export const BlockMath: ComponentType<KatexProps>;
  export const InlineMath: ComponentType<KatexProps>;
}
