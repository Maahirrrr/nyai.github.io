import React, { useEffect, useRef } from 'react';

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'backward';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

const Plasma: React.FC<PlasmaProps> = ({
  scale = 1.1,
  opacity = 0.8,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Static multi-layered gradient using the new palette
    container.style.background = `
      radial-gradient(circle at 20% 30%, var(--deep-blue) 0%, transparent 60%),
      radial-gradient(circle at 80% 70%, var(--deep-red) 0%, transparent 60%),
      radial-gradient(circle at 50% 50%, var(--neutral-gray) 0%, transparent 50%)
    `;
    container.style.opacity = (opacity * 0.4).toString(); // Subtle opacity
    container.style.filter = `blur(${50 * scale}px)`;
    container.style.transition = 'opacity 0.8s ease-in-out';

    return () => {};
  }, [opacity, scale]);

  return (
    <div 
      ref={containerRef}
      className="plasma-inner"
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0,
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
};

export default Plasma;
