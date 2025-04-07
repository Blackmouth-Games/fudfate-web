
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import GlitchText from './GlitchText';

const Navbar = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/70 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <GlitchText text="FUDfate" goldEffect className="text-2xl font-pixel-2p" />
            </Link>
          </div>
          
          {!isMobile ? (
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link to="/" className="text-white hover:text-accent px-3 py-2 rounded-md font-pixel">
                  {t('nav.home')}
                </Link>
                <Link to="/#about" className="text-white hover:text-accent px-3 py-2 rounded-md font-pixel">
                  {t('nav.about')}
                </Link>
                <Link to="/#cards" className="text-white hover:text-accent px-3 py-2 rounded-md font-pixel">
                  {t('nav.cards')}
                </Link>
                <Link 
                  to="https://app-fudfate.blackmouthgames.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-accent text-black font-bold px-4 py-2 rounded hover:bg-accent/90 transition-colors pixel-btn pixel-btn-accent"
                >
                  {t('nav.app')}
                </Link>
                <LanguageSwitcher />
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <LanguageSwitcher />
              <button
                onClick={toggleMenu}
                className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-accent focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="text-white hover:text-accent block px-3 py-2 rounded-md font-pixel"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/#about" 
              className="text-white hover:text-accent block px-3 py-2 rounded-md font-pixel"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link 
              to="/#cards" 
              className="text-white hover:text-accent block px-3 py-2 rounded-md font-pixel"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.cards')}
            </Link>
            <Link 
              to="https://app-fudfate.blackmouthgames.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full text-center bg-accent text-black font-bold px-4 py-2 rounded hover:bg-accent/90 transition-colors mt-4 pixel-btn pixel-btn-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.app')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
