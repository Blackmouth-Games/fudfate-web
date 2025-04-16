
import React from 'react';
import '../styles/logo.css';

interface GlitchLogoProps {
  imageUrl: string;
  className?: string; // Added optional className prop
}

const GlitchLogo = ({ imageUrl, className = '' }: GlitchLogoProps) => {
    return (
        <div className="glitch-logo">
            <div className="logo-container relative inline-block">
                <img 
                    src={imageUrl} 
                    alt="FUDfate Logo" 
                    className={`h-32 md:h-40 mx-auto mb-8 logo-glitch ${className}`}
                />
                <img 
                    src={imageUrl} 
                    alt="FUDfate Logo Glitch 1" 
                    className={`absolute top-0 left-0 h-32 md:h-40 mx-auto mb-8 glitch-effect-1 ${className}`}
                />
                <img 
                    src={imageUrl} 
                    alt="FUDfate Logo Glitch 2" 
                    className={`absolute top-0 left-0 h-32 md:h-40 mx-auto mb-8 glitch-effect-2 ${className}`}
                />
            </div>
        </div>
    );
};

export default GlitchLogo;
