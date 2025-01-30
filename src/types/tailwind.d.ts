// src/types/tailwind.d.ts
declare module 'tailwindcss/lib/util/flattenColorPalette' {
    import { type Config } from 'tailwindcss';
    export default function flattenColorPalette(
      colors: Config['theme']['colors']
    ): Record<string, string>;
  }