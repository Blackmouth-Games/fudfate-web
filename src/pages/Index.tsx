import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import GlitchText from '@/components/GlitchText';
import AnimatedSection from '@/components/AnimatedSection';
import TarotCard from '@/components/TarotCard';
import { Link } from 'react-router-dom';
import BackToTop from '@/components/BackToTop';
import GlitchLogo from '@/components/GlitchLogo';
import { Button } from '@/components/ui/button';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cards = [
    {
      imageUrl: '/lovable-uploads/67d4084b-d7c2-4a91-bc0c-178644bbd65f.png',
      title: 'The Fool',
    },
    {
      imageUrl: '/lovable-uploads/fe874e9d-7e40-4f50-bbae-c0d5b052eba1.png',
      title: 'The Magician',
    },
    {
      imageUrl: '/lovable-uploads/e983f33c-e21f-4a11-90f5-0d73db998e39.png',
      title: 'Crypto Fortune',
    },
    {
      imageUrl: '/lovable-uploads/b40a6db1-794b-4a12-a495-70cba49771b4.png',
      title: 'The HODLer',
    },
    {
      imageUrl: '/lovable-uploads/7eeb5f11-8ebb-45b3-aa32-af65c0cc89ba.png',
      title: 'The Emperor',
    },
    {
      imageUrl: '/lovable-uploads/4e84fbc3-0363-4303-82c9-aad716f3bd02.png',
      title: 'The Degen',
    }
  ];

  const handleClick = () => {
    window.open('https://app-fudfate.blackmouthgames.com/', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BackToTop />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="max-w-6xl w-full mx-auto text-center relative z-10">
          <AnimatedSection animation="fade-in" className="mb-6">
            <GlitchLogo 
              imageUrl="/lovable-uploads/e983f33c-e21f-4a11-90f5-0d73db998e39.png" 
            />
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
            <Button 
              variant="glitch" 
              onClick={handleClick}
              data-text={t('hero.cta')}
              className="text-xl font-pixel glitch-button"
            >
              {t('hero.cta')}
            </Button>
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
      <section id="cards" className="py-20 px-4 md:px-8 lg:px-16 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection animation="fade-in" className="mb-16 text-center">
            <GlitchText text={t('cards.title')} goldEffect className="text-3xl md:text-4xl font-pixel-2p mb-6 text-black" />
            <p className="text-lg md:text-xl text-gray-700 font-pixel max-w-3xl mx-auto">
              {t('cards.description')}
            </p>
          </AnimatedSection>
          
          <Carousel 
            className="w-full max-w-5xl mx-auto"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="py-10">
              {cards.map((card, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-6">
                  <div className="floating" style={{ animationDelay: `${0.2 * index}s` }}>
                    <TarotCard 
                      imageUrl={card.imageUrl}
                      title={card.title} 
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-12">
              <CarouselPrevious className="relative static mr-2" />
              <CarouselNext className="relative static ml-2" />
            </div>
          </Carousel>
        </div>
      </section>

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
    </div>
  );
};

export default Index;
