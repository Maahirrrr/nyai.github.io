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
  color = "#ff6b35",
  speed = 0.6,
  direction = "forward",
  scale = 1.1,
  opacity = 0.8,
  mouseInteractive = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a placeholder for the actual Plasma animation logic.
    // In a real shadcn component from @react-bits, this would involve 
    // a canvas or complex CSS animations.
    // Since I don't have the internal source of @react-bits/Plasma-JS-CSS,
    // I will implement a beautiful CSS-based plasma effect that respects the props.
    
    const container = containerRef.current;
    if (!container) return;

    // Apply styles to the container
    container.style.background = `radial-gradient(circle at center, ${color} 0%, transparent 70%)`;
    container.style.opacity = opacity.toString();
    container.style.filter = `blur(${30 * scale}px)`;
    container.style.transition = 'background 0.5s ease-out';

    let mouseX = 50;
    let mouseY = 50;
    let currentX = 50;
    let currentY = 50;

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteractive) return;
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    };

    if (mouseInteractive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += speed * 0.02 * (direction === 'forward' ? 1 : -1);
      
      // Smoothly interpolate mouse position
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      const dynamicX = currentX + Math.sin(time) * 10;
      const dynamicY = currentY + Math.cos(time * 0.8) * 10;

      container.style.background = `
        radial-gradient(circle at ${dynamicX}% ${dynamicY}%, ${color}22 0%, transparent 50%),
        radial-gradient(circle at ${100 - dynamicX}% ${100 - dynamicY}%, ${color}11 0%, transparent 60%),
        radial-gradient(circle at ${dynamicY}% ${dynamicX}%, ${color}33 0%, transparent 40%)
      `;

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

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
