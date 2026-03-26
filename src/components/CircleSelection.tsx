import React from 'react';
import { motion } from 'motion/react';
import { Users, Compass, ChevronRight, Activity, Award } from 'lucide-react';
import { Circle } from '../types';
import { MOCK_CIRCLES } from '../App';
import { cn } from '../lib/utils';

interface CircleSelectionProps {
  onSelect: (circle: Circle) => void;
}

export const CircleSelection: React.FC<CircleSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-10"
      >
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 mb-2">
            <Users size={32} />
          </div>
          <h2 className="text-4xl font-bold tracking-tight">Choose Your Circle</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Join a community of lifesavers. Your circle is where you'll track impact, compete on leaderboards, and save lives together.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_CIRCLES.map((circle, idx) => (
            <motion.button
              key={circle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelect(circle)}
              className="glass-card p-6 rounded-3xl text-left hover:bg-white/[0.07] transition-all group border border-white/5 hover:border-red-500/30"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold group-hover:text-red-500 transition-colors">{circle.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{circle.description || 'A community of dedicated blood donors saving lives together.'}</p>
                </div>
                <div className="bg-red-500/10 p-2 rounded-xl text-red-500">
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold flex items-center gap-1">
                    <Activity size={10} /> Activity
                  </p>
                  <p className="text-sm font-mono font-bold text-green-500">{circle.activityScore}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold flex items-center gap-1">
                    <Award size={10} /> Points
                  </p>
                  <p className="text-sm font-mono font-bold text-yellow-500">{circle.points.toLocaleString()}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <p className="text-center text-xs text-gray-600">
          Don't worry, you can always switch your circle later in the Explore tab.
        </p>
      </motion.div>
    </div>
  );
};
