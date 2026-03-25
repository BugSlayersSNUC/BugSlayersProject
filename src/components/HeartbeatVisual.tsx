import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface HeartbeatVisualProps {
  score: number; // 0 to 100
}

export const HeartbeatVisual: React.FC<HeartbeatVisualProps> = ({ score }) => {
  // Calculate duration based on score (higher score = faster beat)
  // 100 score -> 0.6s duration (100 BPM)
  // 0 score -> 1.5s duration (40 BPM)
  const duration = score > 0 ? (1.5 - (score / 100) * 0.9) : 0;

  // Calculate color based on score
  // 100 score -> Bright Red (#ef4444)
  // Only becomes noticeably dull at very low scores (< 20)
  const getHeartColor = () => {
    if (score === 0) return "#374151";
    
    // Use a non-linear interpolation to keep it red longer
    // If score > 20, keep it mostly red
    const factor = Math.pow(score / 100, 0.5); // Square root makes it stay higher longer
    
    const r = Math.round(55 + factor * 184); // 55 to 239
    const g = Math.round(65 - factor * 21);  // 65 to 44
    const b = Math.round(81 - factor * 37);  // 81 to 44
    return `rgb(${r}, ${g}, ${b})`;
  };

  const heartColor = getHeartColor();
  const maxScale = 1 + (score / 100) * 0.5; // 1.0 to 1.5

  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <motion.div 
          animate={score > 0 ? {
            scale: [1, 2],
            opacity: [0.3, 0],
          } : { scale: 1, opacity: 0 }}
          transition={{
            duration: duration * 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="w-64 h-64 rounded-full border-2"
          style={{ borderColor: heartColor }}
        />
      </div>
      
      <motion.div
        animate={score > 0 ? {
          scale: [1, maxScale, 1],
          filter: [`drop-shadow(0 0 5px ${heartColor}44)`, `drop-shadow(0 0 20px ${heartColor}aa)`, `drop-shadow(0 0 5px ${heartColor}44)`]
        } : { scale: 1, filter: 'none' }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10"
      >
        <Heart 
          size={120} 
          fill={heartColor} 
          style={{ color: heartColor }}
          className="transition-colors duration-500"
        />
      </motion.div>

      <div className="mt-6 text-center">
        <div className="text-4xl font-mono font-bold tracking-tighter">
          {score > 0 ? Math.round(40 + (score / 100) * 60) : 0} 
          <span className="text-sm text-gray-500 ml-1">BPM</span>
        </div>
        <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">
          Circle Vitality
        </div>
      </div>

      {score === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-700/50"
        />
      )}
    </div>
  );
};
