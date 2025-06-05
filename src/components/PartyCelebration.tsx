import React, { useEffect, useState } from 'react';
import { PARTY } from '@/utils/party-config';

const ROCKETS_COUNT = 12;

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const Rocket: React.FC<{ idx: number }> = ({ idx }) => {
  const [start, setStart] = useState(false);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const delay = getRandom(0, 1200);
    const duration = getRandom(2.5, 4.5) * 1000;
    setTimeout(() => setStart(true), delay);
    setTimeout(() => setShow(false), delay + duration);
  }, []);
  const left = getRandom(10, 90); // % horizontal
  const duration = getRandom(2.5, 4.5); // seg
  const size = getRandom(32, 48); // px
  if (!show) return null;
  return (
    <div
      className={`party-rocket${start ? ' party-rocket-animate' : ''}`}
      style={{
        left: `${left}%`,
        bottom: '-60px',
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${duration}s`,
        zIndex: 9999,
      }}
    >
      <span style={{fontSize: size, display: 'block', transform: 'rotate(-45deg)'}}>🚀</span>
    </div>
  );
};

const PartyCelebration: React.FC = () => {
  const [show, setShow] = useState(PARTY);
  useEffect(() => {
    if (PARTY) {
      setTimeout(() => setShow(false), 4000);
    }
  }, []);
  if (!show) return null;
  return (
    <>
      {/* Cohetes animados de abajo hacia arriba */}
      {Array.from({ length: ROCKETS_COUNT }).map((_, i) => (
        <Rocket key={i} idx={i} />
      ))}
      <style>{`
        .party-rocket {
          position: fixed;
          transition: opacity 0.5s;
          opacity: 1;
          pointer-events: none;
        }
        .party-rocket-animate {
          animation: party-rocket-move-up linear forwards;
        }
        @keyframes party-rocket-move-up {
          0% { bottom: -60px; opacity: 1; }
          80% { opacity: 1; }
          100% { bottom: 110vh; opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default PartyCelebration; 