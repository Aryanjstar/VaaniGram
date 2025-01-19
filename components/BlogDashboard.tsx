'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import TextInput from './TextInput';
import VideoInput from './VideoInput';
import TranslationProgress from './TranslationProgress';

export default function BlogDashboard() {
  const [activeTab, setActiveTab] = useState('text');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleTextSubmit = async (text: string, file: File | null) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else {
        formData.append('text', text);
      }

      const response = await fetch('/api/translate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Translation failed');

      // Simulate progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
        }
      }, 500);

    } catch (error) {
      console.error('Error:', error);
      setIsProcessing(false);
    }
  };

  const handleVideoSubmit = async (file: File) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('video', file);

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Transcription failed');

      // Simulate progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
        }
      }, 500);

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
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Multilingual Blog Dashboard
          </h1>

          <div className="flex mb-6 space-x-4">
            <TabButton
              active={activeTab === 'text'}
              onClick={() => setActiveTab('text')}
              label="Text Input"
            />
            <TabButton
              active={activeTab === 'video'}
              onClick={() => setActiveTab('video')}
              label="Video Input"
            />
          </div>

          {activeTab === 'text' ? (
            <TextInput onSubmit={handleTextSubmit} disabled={isProcessing} />
          ) : (
            <VideoInput onSubmit={handleVideoSubmit} disabled={isProcessing} />
          )}

          {isProcessing && <TranslationProgress progress={progress} />}
        </div>
      </motion.div>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-6 py-2 rounded-lg font-medium transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </motion.button>
  );
}