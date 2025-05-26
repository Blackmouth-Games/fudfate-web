import React, { useEffect, useRef, useState } from 'react';

// Fecha de prueba: 1 hora en el futuro desde ahora
function getTargetDate() {
  // 6 de julio de 2025, 17:00 hora de Madrid (UTC+2) = 15:00 UTC
  return new Date(Date.UTC(2025, 6, 6, 15, 0, 0));
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

const TICKER_PHRASES = [
  '🚀 $FDft set to moon — July 6th. Apes together strong. ⏳',
  '🐳 $FDft whales are loading bags — Launch drops July 6th. Get in or cry later. 📈',
  '🔥 Fueling the rocket... $FDft launch on July 6th — WAGMI 🛸',
  '⛽ Full send activated: $FDft ignites on July 6th. NGMI if you miss it. 🧨',
];

const SEPARATOR = '        ';
const ANIMATION_DURATION = 18; // segundos

const NewsBar: React.FC = () => {
  const [targetDate] = useState(getTargetDate());
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));
  const [currentPhrase, setCurrentPhrase] = useState(() => TICKER_PHRASES[Math.floor(Math.random() * TICKER_PHRASES.length)]);
  const [nextPhrase, setNextPhrase] = useState(() => {
    let idx;
    do {
      idx = Math.floor(Math.random() * TICKER_PHRASES.length);
    } while (TICKER_PHRASES[idx] === currentPhrase);
    return TICKER_PHRASES[idx];
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
      idx = Math.floor(Math.random() * TICKER_PHRASES.length);
    } while (TICKER_PHRASES[idx] === nextPhrase);
    setNextPhrase(TICKER_PHRASES[idx]);
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
          <div className="countdown-desktop">
            {`${pad(timeLeft.days)}d ${pad(timeLeft.hours)}h ${pad(timeLeft.minutes)}m ${pad(timeLeft.seconds)}s`}
          </div>
        </div>
        {/* Countdown (mobile, fuera del flex) */}
        <div className="countdown-mobile-fixed">
          {`${pad(timeLeft.days)}d ${pad(timeLeft.hours)}h ${pad(timeLeft.minutes)}m ${pad(timeLeft.seconds)}s`}
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
      `}</style>
    </div>
  );
};

export default NewsBar; 