
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
      variant="ghost" 
      size={isMobile ? "sm" : "default"} 
      className="text-white hover:text-accent hover:bg-transparent"
    >
      {i18n.language === 'en' ? 'ES' : 'EN'}
    </Button>
  );
};

export default LanguageSwitcher;
