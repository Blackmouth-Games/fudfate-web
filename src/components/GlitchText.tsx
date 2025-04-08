
import React from 'react';
import { cn } from '../lib/utils';

interface GlitchTextProps {
  text: string;
  className?: string;
  goldEffect?: boolean;
}

const GlitchText = ({ text, className, goldEffect = false }: GlitchTextProps) => {
  return (
    <div className={cn("glitch relative", goldEffect && "gold-text", className)}>
      {text}      
    </div>
  );
};

export default GlitchText;
