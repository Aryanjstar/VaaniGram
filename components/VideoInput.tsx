'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface VideoInputProps {
  onSubmit: (file: File) => void;
  disabled: boolean;
}

export default function VideoInput({ onSubmit, disabled }: VideoInputProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit(file);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          onChange={handleFileChange}
          accept="video/*"
          className="hidden"
          id="video-upload"
          disabled={disabled}
        />
        <label
          htmlFor="video-upload"
          className="cursor-pointer block"
        >
          {preview ? (
            <video
              ref={videoRef}
              src={preview}
              className="mx-auto max-h-64 rounded-lg"
              controls
            />
          ) : (
            <div className="py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h18M3 16h18"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Click to upload a video file
              </p>
            </div>
          )}
        </label>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled || !file}
      >
        Transcribe & Translate
      </motion.button>
    </motion.form>
  );
}