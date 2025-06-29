declare module 'react-parallax' {
  import * as React from 'react';

  interface ParallaxProps {
    className?: string;
    bgImage?: string;
    bgImageAlt?: string;
    strength?: number;
    blur?: number | { min: number; max: number };
    bgClassName?: string;
    contentClassName?: string;
    renderLayer?: (percentage: number) => React.ReactNode;
    disabled?: boolean;
    bgImageStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export class Parallax extends React.Component<ParallaxProps> {}
}
