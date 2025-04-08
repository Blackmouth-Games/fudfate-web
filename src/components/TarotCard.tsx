
import React from 'react';
import { cn } from '@/lib/utils';

interface TarotCardProps {
  imageUrl: string;
  number: string;
  title: string;
  className?: string;
  delay?: number;
}

const TarotCard = ({ imageUrl, number, title, className, delay = 0 }: TarotCardProps) => {
  return (
    <div 
      className={cn("card-container", className)} 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="card-3d w-full max-w-[240px] mx-auto">
        <div className="relative pb-8"> {/* Added padding-bottom to accommodate the title */}
          <div className="aspect-[3/5] overflow-hidden gold-frame rounded-lg">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover pixelated"
            />
          </div>
          <div className="absolute top-2 left-0 right-0 text-center">
            <span className="gold-text text-lg font-pixel-2p">{number}</span>
          </div>
          <div className="absolute -bottom-2 left-0 right-0 text-center"> {/* Adjusted position */}
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
