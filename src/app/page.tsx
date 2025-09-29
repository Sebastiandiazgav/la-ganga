'use client';

import React, { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
// Se ha eliminado la importación de EnvChecker.
import { translations } from '@/lib/translations';

type Language = 'es' | 'en';

export default function Home() {
  const [language, setLanguage] = useState<Language>('es');

  const t = translations[language];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col items-center gap-4">
          
          <div className="absolute top-0 right-0 flex space-x-2">
            <button
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                language === 'es' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                language === 'en' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              EN
            </button>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white text-center mt-8 sm:mt-0">{t.title}</h1>
            <p className="text-gray-400 mt-2 text-center text-lg">{t.subtitle}</p>
            {/* El componente EnvChecker ha sido eliminado de aquí. */}
          </div>
        </div>
      </header>

      <div className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/20 h-[75vh]">
          <ChatInterface
            translations={t}
          />
        </div>
      </div>
      
      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/20 mt-auto">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {t.footerCopyright}
          </p>
          <div className="flex space-x-4">
            <a
              href="https://sensay.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-white"
            >
              {t.footerPoweredBy}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
