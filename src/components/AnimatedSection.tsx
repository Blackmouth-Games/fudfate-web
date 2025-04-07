
import React, { ReactNode, CSSProperties } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-in-right' | 'slide-in-left' | 'slide-in-up';
  threshold?: number;
  delay?: number;
  style?: CSSProperties;
}

const AnimatedSection = ({ 
  children, 
  className, 
  animation = 'fade-in', 
  threshold = 0.2,
  delay = 0,
  style
}: AnimatedSectionProps) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <div 
      ref={ref} 
      className={cn(
        className,
        inView ? animation : 'opacity-0',
      )}
      style={{ 
        transitionDelay: `${delay}ms`,
        ...style 
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
