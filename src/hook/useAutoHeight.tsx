import { useEffect, useRef, useState } from 'react';

export const useAutoHeight = (isOpen, duration = 300) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    height: isOpen ? 'none' : '0px',
    overflow: 'hidden',
    transition: `height ${duration}ms ease`,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isOpen) {
      const scrollHeight = el.scrollHeight;
      setStyle({
        height: scrollHeight + 'px',
        overflow: 'hidden',
        transition: `height ${duration}ms ease`,
      });

      const timeout = setTimeout(() => {
        // Allow content to resize without forcing height after animation
        setStyle({
          height: 'none',
          overflow: 'visible',
          transition: `max-height ${duration}ms ease`,
        });
      }, duration);

      return () => clearTimeout(timeout);
    } else {
      // Force back to calculated height first to trigger transition
      const scrollHeight = el.scrollHeight;
      setStyle({
        height: scrollHeight + 'px',
        overflow: 'hidden',
        transition: `max-height ${duration}ms ease`,
      });

      // Then force back to 0 after a tiny delay to allow transition
      requestAnimationFrame(() => {
        setStyle({
          height: '0',
          overflow: 'hidden',
          transition: `height ${duration}ms ease`,
        });
      });
    }
  }, [isOpen, duration]);

  return { ref, style };
};
