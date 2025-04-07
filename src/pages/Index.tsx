
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GlitchText from '@/components/GlitchText';
import AnimatedSection from '@/components/AnimatedSection';
import TarotCard from '@/components/TarotCard';
import { Link } from 'react-router-dom';

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none"></div>
        <div className="max-w-6xl w-full mx-auto text-center relative z-10">
          <AnimatedSection animation="fade-in" className="mb-6">
            <h1 className="text-5xl md:text-7xl font-pixel-2p mb-4">
              <GlitchText text={t('hero.title')} goldEffect className="inline-block" />
            </h1>
            <p className="text-2xl md:text-3xl text-secondary font-pixel mb-8">
              {t('hero.subtitle')}
            </p>
          </AnimatedSection>
          <AnimatedSection animation="slide-in-up" delay={300} className="mb-10">
            <p className="text-xl md:text-2xl text-gray-300 font-pixel max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
          </AnimatedSection>
          <AnimatedSection animation="slide-in-up" delay={600}>
            <Link 
              to="https://app-fudfate.blackmouthgames.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="pixel-btn pixel-btn-accent text-xl font-pixel"
            >
              {t('hero.cta')}
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 md:px-8 lg:px-16 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-in" className="mb-12 text-center">
            <GlitchText text={t('about.title')} goldEffect className="text-3xl md:text-4xl font-pixel-2p mb-6" />
            <p className="text-lg md:text-xl text-gray-300 font-pixel max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection animation="slide-in-up" delay={100} className="bg-black/40 gold-frame p-6 rounded-lg text-center">
              <h3 className="text-xl font-pixel gold-text mb-3">{t('about.feature1')}</h3>
              <p className="text-gray-300">Unique pixel art style blending classic tarot and modern crypto aesthetics</p>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-up" delay={300} className="bg-black/40 gold-frame p-6 rounded-lg text-center">
              <h3 className="text-xl font-pixel gold-text mb-3">{t('about.feature2')}</h3>
              <p className="text-gray-300">Features beloved crypto memes and characters from the Web3 universe</p>
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-up" delay={500} className="bg-black/40 gold-frame p-6 rounded-lg text-center">
              <h3 className="text-xl font-pixel gold-text mb-3">{t('about.feature3')}</h3>
              <p className="text-gray-300">Predict your crypto future with our digital oracle and navigate market FUD</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section id="cards" className="py-16 px-4 md:px-8 lg:px-16 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-in" className="mb-12 text-center">
            <GlitchText text={t('cards.title')} goldEffect className="text-3xl md:text-4xl font-pixel-2p mb-6" />
            <p className="text-lg md:text-xl text-gray-300 font-pixel max-w-3xl mx-auto">
              {t('cards.description')}
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 mb-12">
            <AnimatedSection animation="slide-in-up" delay={100} className="floating">
              <TarotCard 
                imageUrl="/lovable-uploads/4e84fbc3-0363-4303-82c9-aad716f3bd02.png" 
                number="7" 
                title={t('cards.card1')} 
              />
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-up" delay={300} className="floating" style={{ animationDelay: "0.2s" }}>
              <TarotCard 
                imageUrl="/lovable-uploads/7eeb5f11-8ebb-45b3-aa32-af65c0cc89ba.png" 
                number="16" 
                title={t('cards.card2')} 
              />
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-up" delay={500} className="floating" style={{ animationDelay: "0.4s" }}>
              <TarotCard 
                imageUrl="/lovable-uploads/27f635a3-2a45-4a8c-a478-53e18f7efbf2.png" 
                number="19" 
                title={t('cards.card3')} 
              />
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-up" delay={700} className="floating" style={{ animationDelay: "0.6s" }}>
              <TarotCard 
                imageUrl="/lovable-uploads/b40a6db1-794b-4a12-a495-70cba49771b4.png" 
                number="0" 
                title={t('cards.card4')} 
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-black/40 relative">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection animation="fade-in" className="mb-6">
            <GlitchText text={t('cta.title')} goldEffect className="text-3xl md:text-4xl font-pixel-2p mb-4" />
            <p className="text-lg md:text-xl text-gray-300 font-pixel max-w-3xl mx-auto mb-8">
              {t('cta.subtitle')}
            </p>
          </AnimatedSection>
          <AnimatedSection animation="slide-in-up" delay={300}>
            <Link 
              to="https://app-fudfate.blackmouthgames.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="pixel-btn pixel-btn-accent text-xl font-pixel animate-pulse-glow"
            >
              {t('cta.button')}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
