import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GlitchText from '@/components/GlitchText';
import AnimatedSection from '@/components/AnimatedSection';
import GlitchLogo from '@/components/GlitchLogo';
import TarotCardSection from '@/components/TarotCardSection';
import WhitelistForm from '@/components/WhitelistForm';
import BackToTop from '@/components/BackToTop';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const arrowRef = useRef(null);
  const [arrowPos, setArrowPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight - 60 });
  const [angle, setAngle] = useState(0);
  const [arrowColor, setArrowColor] = useState('#A69AE9');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    // Glitch color effect
    const colors = ['#A69AE9', '#FFEF4C', '#00FFFF', '#FF00FF', '#FF6F61', '#00FF00'];
    let i = 0;
    const interval = setInterval(() => {
      setArrowColor(colors[i % colors.length]);
      i++;
    }, 120);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const btn = document.getElementById('join-whitelist-btn');
      const comingSoon = document.querySelector('span.block.text-xs.text-gray-400.font-pixel.text-center.mt-1');
      if (!btn) return;
      const btnRect = btn.getBoundingClientRect();
      const btnCenter = {
        x: btnRect.left + btnRect.width / 2,
        y: btnRect.top + btnRect.height / 2,
      };
      // Detect area of coming soon
      let inComingSoon = false;
      if (comingSoon) {
        const csRect = comingSoon.getBoundingClientRect();
        if (
          e.clientX >= csRect.left &&
          e.clientX <= csRect.right &&
          e.clientY >= csRect.top &&
          e.clientY <= csRect.bottom
        ) {
          inComingSoon = true;
        }
      }
      const dx = btnCenter.x - e.clientX;
      const dy = btnCenter.y - e.clientY;
      const theta = Math.atan2(dy, dx) * 180 / Math.PI;
      setAngle(theta + 270);
      const distance = 40;
      const rad = Math.atan2(dy, dx);
      // Si el ratón está dentro del rectángulo del botón o en coming soon
      if (
        (e.clientX >= btnRect.left &&
        e.clientX <= btnRect.right &&
        e.clientY >= btnRect.top &&
        e.clientY <= btnRect.bottom) || inComingSoon
      ) {
        // Calcula el punto más cercano en el borde del botón
        let edgeX = e.clientX;
        let edgeY = e.clientY;
        if (e.clientX < btnCenter.x) edgeX = btnRect.left;
        else if (e.clientX > btnCenter.x) edgeX = btnRect.right;
        if (e.clientY < btnCenter.y) edgeY = btnRect.top;
        else if (e.clientY > btnCenter.y) edgeY = btnRect.bottom;
        setArrowPos({ x: edgeX, y: edgeY });
      } else {
        // Coloca la flecha a 'distance' del ratón en dirección al botón
        setArrowPos({
          x: e.clientX + Math.cos(rad) * distance,
          y: e.clientY + Math.sin(rad) * distance,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = () => {
    window.open('https://app.fudfate.xyz/', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BackToTop />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="max-w-6xl w-full mx-auto text-center relative z-10">
          <AnimatedSection animation="fade-in" className="mb-6">
            <div className="flex justify-center mb-8">
              <GlitchLogo 
                imageUrl="/img/logos/logo.png"
                subtitle={t('hero.subtitle')}
              />
            </div>
          </AnimatedSection>
          <AnimatedSection animation="slide-in-up" delay={600} className="space-y-8">
            <div className="mt-12 space-y-4">
              <GlitchText 
                text={t('whitelist.cta')}
                className="text-2xl md:text-3xl font-pixel-2p mb-6"
                goldEffect
              />
              <WhitelistForm modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 md:px-8 lg:px-16 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-in" className="mb-12 text-center">
            <GlitchText text={t('about.title')} goldEffect className="text-3xl md:text-4xl font-pixel-2p mb-6 text-black" />
            <p className="text-lg md:text-xl text-gray-700 font-pixel max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection animation="slide-in-up" delay={100} className="bg-white gold-frame p-6 rounded-lg text-center">
              <h3 className="text-xl font-pixel gold-text mb-3">{t('about.feature1')}</h3>
              <p className="text-gray-700">Unique pixel art style blending classic tarot and modern crypto aesthetics</p>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-up" delay={300} className="bg-white gold-frame p-6 rounded-lg text-center">
              <h3 className="text-xl font-pixel gold-text mb-3">{t('about.feature2')}</h3>
              <p className="text-gray-700">Features beloved crypto memes and characters from the Web3 universe</p>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-up" delay={500} className="bg-white gold-frame p-6 rounded-lg text-center">
              <h3 className="text-xl font-pixel gold-text mb-3">{t('about.feature3')}</h3>
              <p className="text-gray-700">Predict your crypto future with our digital oracle and navigate market FUD</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <TarotCardSection />

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor: '#FAD12B' }}>
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection animation="fade-in" className="mb-6">
            <GlitchText text={t('cta.title')} goldEffect className="text-3xl md:text-4xl font-pixel-2p mb-4 text-black" />
            <p className="text-lg md:text-xl text-gray-700 font-pixel max-w-3xl mx-auto mb-8">
              {t('cta.subtitle')}
            </p>
          </AnimatedSection>
          <AnimatedSection animation="slide-in-up" delay={300}>
            <Button 
              variant="glitch" 
              onClick={handleClick} 
              data-text="Reveal Your Destiny"
              className="text-xl font-pixel glitch-button"
            >
              Reveal Your Destiny
            </Button>
          </AnimatedSection>
        </div>
      </section>
      {/* Flecha flotante global */}
      {!modalOpen && (
        <svg
          ref={arrowRef}
          style={{
            position: 'fixed',
            left: arrowPos.x,
            top: arrowPos.y,
            width: 28,
            height: 28,
            pointerEvents: 'none',
            zIndex: 1000,
            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
            transition: 'left 0.08s linear, top 0.08s linear, transform 0.08s linear',
          }}
          viewBox="0 0 24 24"
          fill="none"
          stroke={arrowColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2 L12 22" />
          <path d="M6 16 L12 22 L18 16" />
        </svg>
      )}
    </div>
  );
};

export default Index;
