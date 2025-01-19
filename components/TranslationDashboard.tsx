'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TranslationInput from './TranslationInput';
import TranslationResults from './TranslationResults';
import TranslationProgress from './TranslationProgress';

export default function TranslationDashboard() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [translations, setTranslations] = useState<Record<string, string> | null>(null);
  const [inputWord, setInputWord] = useState<string>('');

  const handleTranslate = async (word: string) => {
    if (!word.trim()) return;
    
    setIsProcessing(true);
    setTranslations(null);
    setInputWord(word);
    
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
      });

      if (!response.ok) throw new Error('Translation failed');

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
        }
      }, 200);

      const data = await response.json();
      setTranslations(data.translations);
    } catch (error) {
      console.error('Error:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h1 
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            VaaniGram
          </motion.h1>
          <motion.p 
            className="text-gray-300 text-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Get word meanings in 10 Indian languages instantly
          </motion.p>
        </div>

        <TranslationInput onSubmit={handleTranslate} disabled={isProcessing} />

        {isProcessing && <TranslationProgress progress={progress} />}

        <AnimatePresence>
          {translations && !isProcessing && (
            <TranslationResults translations={translations} inputWord={inputWord} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}