// global.d.ts
declare module "framer-motion" {
  import { CSSProperties, RefObject } from "react";

  interface MotionProps {
    initial?: CSSProperties | ((custom: any) => CSSProperties);
    animate?: CSSProperties | ((custom: any) => CSSProperties);
    exit?: CSSProperties | ((custom: any) => CSSProperties);
    whileHover?: CSSProperties | ((custom: any) => CSSProperties);
    whileTap?: CSSProperties | ((custom: any) => CSSProperties);
    // ... etc. keep the rest of your custom props
  }

  // The "motion" export
  export const motion: any;

  // Hooks you’ve declared
  export const useMotionValue: any;
  export const useTransform: any;
  export const useSpring: any;
  export const AnimatePresence: any;
  export const useMotionTemplate: any;

  // **Add the function declaration**:
  export function motionValue<T = number>(initial?: T): MotionValue<T>;

  // The MotionValue class
  export class MotionValue<T = any> {
    constructor(defaultValue?: T);
    get(): T;
    set(value: T): void;
    subscribe(callback: (latestValue: T) => void): () => void;
    clearListeners(): void;
    onChange(callback: (latestValue: T) => void): () => void;
  }

  // Add declarations for useScroll if you want
  export function useScroll(options?: {
    target?: RefObject<HTMLElement>;
    offset?: [string, string];
    axis?: "x" | "y";
  }): {
    scrollX: MotionValue<number>;
    scrollY: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
  };
}

interface Window {
  Lenis?: any;
}
