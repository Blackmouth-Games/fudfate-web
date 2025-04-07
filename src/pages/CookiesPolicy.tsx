
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import GlitchText from '@/components/GlitchText';

const CookiesPolicy = () => {
  const { t } = useTranslation();
  const lastUpdated = '2023-04-06';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto bg-black/60 gold-frame rounded-lg p-6 md:p-8">
        <GlitchText 
          text={t('cookiePage.title')} 
          goldEffect 
          className="text-3xl md:text-4xl font-pixel-2p mb-6 text-center" 
        />
        
        <div className="text-right mb-8">
          <p className="text-gray-400">
            {t('cookiePage.lastUpdated')}: {lastUpdated}
          </p>
        </div>
        
        <div className="space-y-6 text-gray-300">
          <p>{t('cookiePage.introduction')}</p>
          
          <h2 className="text-2xl font-pixel gold-text mt-8 mb-4">
            {t('cookiePage.whatAreCookies')}
          </h2>
          <p>{t('cookiePage.cookiesDefinition')}</p>
          
          <h2 className="text-2xl font-pixel gold-text mt-8 mb-4">
            {t('cookiePage.whyWeUse')}
          </h2>
          <p>{t('cookiePage.cookiesUsage')}</p>
          
          <h2 className="text-2xl font-pixel gold-text mt-8 mb-4">
            {t('cookiePage.typesOfCookies')}
          </h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>{t('cookiePage.essentialCookies')}</li>
            <li>{t('cookiePage.analyticsCookies')}</li>
            <li>{t('cookiePage.advertisingCookies')}</li>
          </ul>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/"
            className="pixel-btn pixel-btn-accent font-pixel inline-block"
          >
            {t('cookiePage.back')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;
