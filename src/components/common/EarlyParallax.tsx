import { useEffect, useState, useRef } from 'react';
import { EasingPreset, EffectNumber, EffectString, Parallax } from 'react-scroll-parallax';

type EarlyParallaxProps = {
  children: React.ReactNode;
  disabled?: boolean;
  translateX?: EffectString | EffectNumber;
  translateY?: EffectString | EffectNumber;
  opacity?: EffectNumber;
  scale?: EffectNumber;
  rotate?: EffectNumber;
  easing?: EasingPreset;
  className?: string;
  endAnimation: number;
  style?: React.CSSProperties;
  [key: string]: any; // for additional passthrough props
};

function EarlyParallax({
  children,
  disabled = false,
  translateX,
  translateY,
  opacity,
  scale,
  rotate,
  easing,
  className,
  style,
  endAnimation,
  ...rest
}: EarlyParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState({ start: 0, end: 0 });

  useEffect(() => {
    const updateScrollRange = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;
        const elementTop = rect.top + scrollTop;
        const viewportHeight = window.innerHeight;

        setScrollRange({
          start: elementTop - viewportHeight, // when element enters bottom
          end: elementTop - viewportHeight / endAnimation, // complete earlier (at 1/4 viewport)
        });
      }
    };

    updateScrollRange();
    window.addEventListener('resize', updateScrollRange);
    window.addEventListener('scroll', updateScrollRange);

    return () => {
      window.removeEventListener('resize', updateScrollRange);
      window.removeEventListener('scroll', updateScrollRange);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      <Parallax
        disabled={disabled}
        translateX={translateX}
        translateY={translateY}
        opacity={opacity}
        scale={scale}
        rotate={rotate}
        easing="easeInCubic"
        startScroll={scrollRange.start}
        endScroll={scrollRange.end}
        shouldAlwaysCompleteAnimation
        className="w-100"
        {...rest}
      >
        {children}
      </Parallax>
    </div>
  );
}

export default EarlyParallax;
