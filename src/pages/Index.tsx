
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GlitchText from '@/components/GlitchText';
import AnimatedSection from '@/components/AnimatedSection';
import TarotCard from '@/components/TarotCard';
import { Link } from 'react-router-dom';
import BackToTop from '@/components/BackToTop';

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cards = [
    {
      imageUrl: '/lovable-uploads/67d4084b-d7c2-4a91-bc0c-178644bbd65f.png',
      number: '1',
      title: t('cards.card1'),
    },
    {
      imageUrl: '/lovable-uploads/fe874e9d-7e40-4f50-bbae-c0d5b052eba1.png',
      number: '2',
      title: t('cards.card2'),
    },
    {
      imageUrl: '/lovable-uploads/dde495a3-96cf-43c3-990d-68f4b0bc2fe8.png',
      number: '3',
      title: t('cards.card3'),
    },
    {
      imageUrl: '/lovable-uploads/9bc2f50e-3756-43c8-9462-34a97aa5531c.png',
      number: '0',
      title: t('cards.card4'),
    },
    {
      imageUrl: '/lovable-uploads/7d9fc75d-6461-46e5-b486-1541a65b0468.png',
      number: '4',
      title: 'The Exchange',
    },
    {
      imageUrl: '/lovable-uploads/3b4adc9b-9960-40fa-a966-11cee7809c56.png',
      number: '5',
      title: 'The Whitepaper',
    },
    {
      imageUrl: '/lovable-uploads/acba09e5-803c-48fe-b899-92d90f7d4b7c.png',
      number: '6',
      title: 'The Fork',
    },
    {
      imageUrl: '/lovable-uploads/b113532a-d472-4a91-b7c3-6acc69eac308.png',
      number: '7',
      title: 'The Launchpad',
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BackToTop />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="max-w-6xl w-full mx-auto text-center relative z-10">
          <AnimatedSection animation="fade-in" className="mb-6">
            <img 
              src="/lovable-uploads/e983f33c-e21f-4a11-90f5-0d73db998e39.png" 
              alt="FUDfate Logo" 
              className="h-32 md:h-40 mx-auto mb-8"
            />
            <h1 className="text-4xl md:text-6xl font-pixel-2p mb-4 text-black">
              <GlitchText text={t('hero.title')} goldEffect className="inline-block" />
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-pixel mb-8">
              {t('hero.subtitle')}
            </p>
          </AnimatedSection>
          <AnimatedSection animation="slide-in-up" delay={300} className="mb-10">
            <p className="text-lg md:text-xl text-gray-700 font-pixel max-w-3xl mx-auto">
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
      <section id="cards" className="py-16 px-4 md:px-8 lg:px-16 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-in" className="mb-12 text-center">
            <GlitchText text={t('cards.title')} goldEffect className="text-3xl md:text-4xl font-pixel-2p mb-6 text-black" />
            <p className="text-lg md:text-xl text-gray-700 font-pixel max-w-3xl mx-auto">
              {t('cards.description')}
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 mb-12">
            {cards.slice(0, 4).map((card, index) => (
              <AnimatedSection 
                key={index}
                animation="slide-in-up" 
                delay={100 * (index + 1)} 
                className="floating"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <TarotCard 
                  imageUrl={card.imageUrl} 
                  number={card.number} 
                  title={card.title} 
                />
              </AnimatedSection>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6">
            {cards.slice(4).map((card, index) => (
              <AnimatedSection 
                key={index + 4}
                animation="slide-in-up" 
                delay={100 * (index + 5)} 
                className="floating"
                style={{ animationDelay: `${0.2 * (index + 4)}s` }}
              >
                <TarotCard 
                  imageUrl={card.imageUrl} 
                  number={card.number} 
                  title={card.title} 
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-100 relative">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection animation="fade-in" className="mb-6">
            <GlitchText text={t('cta.title')} goldEffect className="text-3xl md:text-4xl font-pixel-2p mb-4 text-black" />
            <p className="text-lg md:text-xl text-gray-700 font-pixel max-w-3xl mx-auto mb-8">
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
