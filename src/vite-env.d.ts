// src/vite-env.d.ts
/// <reference types="vite/client" />
import * as React from 'react';

declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
// (adicione outros formatos que você usa)

declare global {
  namespace JSX {
    interface MathMLAttributes<T> extends React.HTMLAttributes<T> {
      /**
       * O atributo `display` do MathML,
       * normalmente "block" ou "inline"
       */
      display?: 'block' | 'inline';
    }
    interface IntrinsicElements {
      // use o MathMLAttributes para o <math>
      math: React.DetailedHTMLProps<MathMLAttributes<HTMLElement>, HTMLElement>;
      // para as outras tags, se não tiver atributos especiais,
      // pode continuar usando HTMLAttributes purinho:
      mrow: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      mi:   React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      mo:   React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      mfrac:React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      mn:   React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
