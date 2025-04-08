
import React from 'react';
import { cn } from '@/lib/utils';
import '../styles/cards.css';

interface TarotCardProps {
  imageUrl: string;
  title: string;
  className?: string;
  delay?: number;
}

const TarotCard = ({ imageUrl, title, className, delay = 0 }: TarotCardProps) => {
  return (
    <div 
      className={cn("card-container", className)} 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="card-3d w-full max-w-[240px] mx-auto">
        <div className="relative pb-8"> {/* Padding for the title */}
          <div className="aspect-[3/5] overflow-hidden gold-frame rounded-lg">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover pixelated"
            />
          </div>
          <div className="absolute -bottom-2 left-0 right-0 text-center">
            <div className="glitch inline-block gold-text text-lg font-pixel-2p">
              {title}
              <span aria-hidden="true">{title}</span>
              <span aria-hidden="true">{title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarotCard;
