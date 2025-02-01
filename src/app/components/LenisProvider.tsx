// src/app/components/LenisProvider.tsx

"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check if Lenis is available in the window object
    if (typeof window !== 'undefined' && window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      // Function to enable scroll
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Cleanup function
      return () => {
        lenis.destroy();
      };
    }
  }, []);

  return (
    <>
      <Script 
        src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js" 
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}