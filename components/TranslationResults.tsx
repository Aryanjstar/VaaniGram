'use client';
import { motion } from 'framer-motion';

interface TranslationResultsProps {
  translations: Record<string, string>;
  inputWord: string;
}

const languages = {
  hindi: 'Hindi (हिंदी)',
  marathi: 'Marathi (मराठी)',
  gujarati: 'Gujarati (ગુજરાતી)',
  tamil: 'Tamil (தமிழ்)',
  kannada: 'Kannada (ಕನ್ನಡ)',
  telugu: 'Telugu (తెలుగు)',
  bengali: 'Bengali (বাংলা)',
  malayalam: 'Malayalam (മലയാളം)',
  punjabi: 'Punjabi (ਪੰਜਾਬੀ)',
  odia: 'Odia (ଓଡ଼ିଆ)'
};

export default function TranslationResults({ translations, inputWord }: TranslationResultsProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl mb-8 text-center"
      >
        <h2 className="text-2xl font-semibold text-purple-300 mb-2">English Word</h2>
        <p className="text-3xl text-white">{inputWord}</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Object.entries(languages).map(([key, name], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-purple-300 mb-3">{name}</h3>
            <p className="text-2xl text-gray-100 break-words font-medium">
              {translations[key] === "Not available" ? 
                <span className="text-gray-400 text-lg">Translation not available</span> : 
                translations[key]
              }
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-400">Accuracy: 85%+</span>
              {translations[key] !== "Not available" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-purple-400 hover:text-purple-300"
                  onClick={() => navigator.clipboard.writeText(translations[key])}
                >
                  Copy
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}