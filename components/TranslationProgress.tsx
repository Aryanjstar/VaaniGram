'use client';
import { motion } from 'framer-motion';

interface TranslationProgressProps {
  progress: number;
}

export default function TranslationProgress({ progress }: TranslationProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mb-8"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-purple-300">Processing</span>
          <span className="text-sm font-medium text-purple-300">{progress}%</span>
        </div>
        <div className="h-2 bg-purple-900/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}