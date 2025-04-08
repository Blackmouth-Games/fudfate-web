
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isMobile = useIsMobile();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button 
      onClick={toggleLanguage} 
      variant="outline" 
      size={isMobile ? "sm" : "default"} 
      className="font-pixel bg-accent text-black border-black hover:bg-accent/80 hover:text-black"
    >
      {i18n.language === 'en' ? 'ES 🌍' : 'EN 🌍'}
    </Button>
  );
};

export default LanguageSwitcher;
