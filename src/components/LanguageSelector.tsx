import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { cn } from '../lib/utils';

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'pt', label: 'Português', short: 'PT' },
  { code: 'ta', label: 'தமிழ்', short: 'TA' },
  { code: 'hi', label: 'हिन्दी', short: 'HI' },
];

export const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all w-full group"
      >
        <Globe size={14} className={cn("transition-colors", isOpen ? "text-red-500" : "text-gray-500")} />
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{t('nav.language')}</span>
        <div className="ml-auto flex items-center gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">{currentLang.short}</span>
          <ChevronDown size={10} className={cn("text-gray-500 transition-transform duration-300", isOpen && "rotate-180")} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-0 w-full mb-2 bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50 origin-bottom"
          >
            <div className="p-2 max-h-64 overflow-y-auto custom-scrollbar">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 rounded-xl text-left transition-all",
                    i18n.language === lang.code 
                      ? "bg-red-500/10 text-red-500" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">{lang.label}</span>
                    <span className="text-[8px] uppercase tracking-widest opacity-50">{lang.short}</span>
                  </div>
                  {i18n.language === lang.code && <Check size={12} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
