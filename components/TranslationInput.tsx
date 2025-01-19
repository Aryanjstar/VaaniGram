'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface TranslationInputProps {
  onSubmit: (text: string) => void;
  disabled: boolean;
}

export default function TranslationInput({ onSubmit, disabled }: TranslationInputProps) {
  const [word, setWord] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(word);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="mb-8"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="w-full px-4 py-3 text-gray-100 bg-white/5 rounded-lg border border-purple-500/30 focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
          placeholder="Enter a word in English..."
          disabled={disabled}
          style={{ color: 'white' }}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          disabled={disabled || !word.trim()}
        >
          Get Word Meanings
        </motion.button>
      </div>
    </motion.form>
  );
}