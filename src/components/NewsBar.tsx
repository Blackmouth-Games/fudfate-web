import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LINKS } from "@/utils/links-config";

// Fecha de prueba: 1 hora en el futuro desde ahora
function getTargetDate() {
  // 6 de junio de 2025, 17:00 hora de Madrid (UTC+2) = 15:00 UTC
  return new Date(Date.UTC(2025, 5, 6, 15, 0, 0));
}

function getTimeLeft(target) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const SEPARATOR = '        ';
const ANIMATION_DURATION = 18; // segundos

const NewsBar: React.FC = () => {
  const { t } = useTranslation();
  const tickerPhrases = t('ticker', { returnObjects: true }) as string[];
  const [targetDate] = useState(getTargetDate());
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [currentPhrase, setCurrentPhrase] = useState(() => tickerPhrases[Math.floor(Math.random() * tickerPhrases.length)]);
  const [nextPhrase, setNextPhrase] = useState(() => {
    let idx;
    do {
      idx = Math.floor(Math.random() * tickerPhrases.length);
    } while (tickerPhrases[idx] === currentPhrase);
    return tickerPhrases[idx];
  });
  const [key, setKey] = useState(0); // Para reiniciar animación
  const prevPhrase = useRef(currentPhrase);
  const tickerInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Al terminar la animación, actualiza las frases y reinicia la animación
  const handleAnimationIteration = () => {
    setCurrentPhrase(nextPhrase);
    let idx;
    do {
      idx = Math.floor(Math.random() * tickerPhrases.length);
    } while (tickerPhrases[idx] === nextPhrase);
    setNextPhrase(tickerPhrases[idx]);
    setKey(k => k + 1); // Forzar reinicio de animación
  };

  // Formato con ceros a la izquierda
  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="fixed top-0 left-0 w-full z-50" style={{height: '48px'}}>
      <div className="relative flex items-center justify-between w-full h-full px-2 md:px-8" style={{
        background: 'linear-gradient(90deg, #ff00cc, #333399, #00fff0, #ff00cc)',
        backgroundSize: '600% 600%',
        animation: 'vaporwave-bg 10s ease-in-out infinite',
        boxShadow: '0 2px 16px 0 #ff00cc80',
        borderBottom: '2px solid #fff3',
      }}>
        <div className="newsbar-inner">
          {/* Ticker */}
          <div className="overflow-hidden flex-1 min-w-0 relative" style={{height: '32px'}}>
            <div className="ticker-outer">
              <div
                className="ticker-inner"
                key={key}
                ref={tickerInnerRef}
                onAnimationIteration={handleAnimationIteration}
                style={{
                  animationDuration: `${ANIMATION_DURATION}s`,
                }}
              >
                {currentPhrase + SEPARATOR + nextPhrase + SEPARATOR + currentPhrase + SEPARATOR + nextPhrase + SEPARATOR}
              </div>
            </div>
          </div>
          {/* Countdown (desktop) */}
          <a
            href={LINKS.BUY_NOW_TICKER}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-6 py-2 rounded-lg font-pixel text-lg bg-[#FFE066] text-black border-2 border-[#ffb3ec] shadow-md hover:bg-[#00FFFF] hover:text-black transition-all duration-200 buy-now-ticker-btn"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px' }}
          >
            {t('buyNowTicker')}
          </a>
        </div>
      </div>
      {/* Animaciones CSS y responsive */}
      <style>{`
        @keyframes vaporwave-bg {
          0% {background-position:0% 50%}
          50% {background-position:100% 50%}
          100% {background-position:0% 50%}
        }
        .newsbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 100%;
          padding: 0 1rem;
        }
        .ticker-outer {
          width: 100%;
          height: 32px;
          overflow: hidden;
          position: relative;
        }
        .ticker-inner {
          display: inline-block;
          white-space: nowrap;
          animation: ticker-move ${ANIMATION_DURATION}s linear infinite;
          font-family: 'Pixel', monospace;
          font-size: 1.2rem;
          color: #fff;
          text-shadow: 0 0 6px #fff, 0 0 12px #ff00cc, 0 0 24px #00fff0;
        }
        .countdown-desktop {
          margin-left: 16px;
          flex-shrink: 0;
          font-family: monospace;
          font-size: 18px;
          padding: 4px 12px;
          border-radius: 8px;
          background: rgba(0,0,0,0.6);
          color: #ffb3ec;
          border: 1px solid #ffb3ec;
          box-shadow: 0 0 8px #ff00cc80;
          text-shadow: 0 0 6px #fff, 0 0 12px #ff00cc, 0 0 24px #00fff0;
          display: block;
        }
        .countdown-mobile-fixed {
          display: none;
        }
        @media (max-width: 640px) {
          .newsbar-inner {
            flex-direction: column;
            align-items: stretch;
            padding: 0 0.5rem;
            height: auto;
          }
          .countdown-desktop {
            display: none;
          }
          .countdown-mobile-fixed {
            display: block;
            margin: 6px auto 0 auto;
            font-size: 16px;
            font-family: monospace;
            padding: 4px 14px;
            border-radius: 8px;
            background: rgba(0,0,0,0.85);
            color: #ffb3ec;
            border: 1px solid #ffb3ec;
            box-shadow: 0 0 8px #ff00cc80;
            text-align: center;
            width: fit-content;
            text-shadow: 0 0 6px #fff, 0 0 12px #ff00cc, 0 0 24px #00fff0;
            position: relative;
            z-index: 100;
          }
        }
        @keyframes ticker-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .buy-now-ticker-btn {
          box-shadow: 0 0 16px 4px #ffe066, 0 0 32px 8px #ff00cc80;
          animation: buy-now-glow 1.2s infinite alternate, buy-now-vibrate 0.18s infinite linear;
          position: relative;
        }
        @keyframes buy-now-glow {
          0% { box-shadow: 0 0 16px 4px #ffe066, 0 0 32px 8px #ff00cc80; background: #FFE066; }
          100% { box-shadow: 0 0 32px 8px #00fff0, 0 0 48px 16px #ff00cc; background: #FFEF4C; }
        }
        @keyframes buy-now-vibrate {
          0% { transform: translateY(0px); }
          20% { transform: translateY(-1px); }
          40% { transform: translateY(1px); }
          60% { transform: translateY(-1px); }
          80% { transform: translateY(1px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
};

export default NewsBar; 