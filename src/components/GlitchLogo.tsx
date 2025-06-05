import React from 'react';
import '../styles/logo.css';
import { LINKS } from "@/utils/links-config";

interface GlitchLogoProps {
  imageUrl: string;
  subtitle?: string;
}

const GlitchLogo = ({ imageUrl, subtitle }: GlitchLogoProps) => {
    return (
        <div className="glitch-logo">
            <div className="logo-container relative inline-block">
                <img 
                    src={imageUrl} 
                    alt="FUDfate Logo" 
                    className="h-32 md:h-40 mx-auto mb-8 logo-glitch" 
                />
                <img 
                    src={imageUrl} 
                    alt="FUDfate Logo Glitch 1" 
                    className="absolute top-0 left-0 h-32 md:h-40 mx-auto mb-8 glitch-effect-1" 
                />
                <img 
                    src={imageUrl} 
                    alt="FUDfate Logo Glitch 2" 
                    className="absolute top-0 left-0 h-32 md:h-40 mx-auto mb-8 glitch-effect-2" 
                />
            </div>
            {subtitle && (
                <p className="text-xl md:text-2xl text-secondary font-pixel mb-8 mt-2 text-center">
                    {subtitle}
                </p>
            )}
            <div className="flex justify-center gap-4 mt-6">
                {/* X (Twitter) Button */}
                <a
                    href={LINKS.X}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="FudFate on X"
                    className="p-2 rounded-full bg-black hover:bg-accent transition-colors border-2 border-black shadow-md"
                >
                    {/* X icon from lucide-react */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4z"/><path d="m9 9 6 6m0-6-6 6"/></svg>
                </a>
                {/* Telegram Button */}
                <a
                    href={LINKS.TELEGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="FudFate on Telegram"
                    className="p-2 rounded-full bg-[#229ED9] hover:bg-accent transition-colors border-2 border-black shadow-md"
                >
                    {/* Telegram SVG icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.05 2.39 2.77 9.36c-1.31.48-1.3 1.15-.24 1.46l4.89 1.53 2.1 6.41c.28.82.52 1.13 1.06 1.13.54 0 .75-.25 1.04-.82l2.02-3.34 4.2 3.1c.77.42 1.32.2 1.51-.71l2.73-12.06c.28-1.19-.46-1.7-1.13-1.17z"/></svg>
                </a>
                {/* Pump Fun Button */}
                <a
                    href={LINKS.PUMPFUN}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="FudFate on Pump Fun"
                    className="p-2 rounded-full bg-black hover:bg-accent transition-colors border-2 border-black shadow-md"
                >
                    <img src="/img/logos/Pump_fun_logo.png" alt="Pump Fun" className="w-7 h-7" />
                </a>
                {/* DexScreener Button */}
                <a
                    href={LINKS.DEXSCREENER}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="FudFate on DexScreener"
                    className="p-2 rounded-full bg-black hover:bg-accent transition-colors border-2 border-black shadow-md"
                >
                    <img src="/img/logos/dexscreener_logo.webp" alt="DexScreener" className="w-7 h-7" style={{ filter: 'invert(1) brightness(2)' }} />
                </a>
            </div>
        </div>
    );
};

export default GlitchLogo;
