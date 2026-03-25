import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Users, Heart, ArrowRight, ShieldCheck, Globe, Trophy } from 'lucide-react';
import { Circle } from '../types';
import { cn } from '../lib/utils';

const EXPLORE_CIRCLES: Circle[] = [
  {
    id: 'e1',
    name: 'Downtown Donors',
    description: 'A community of regular donors in the city center. We organize bi-weekly trips to the central bank.',
    members: Array(12).fill({}),
    donations: [],
    activityScore: 92,
    points: 1500,
    distance: '1.2 km',
    isPrivate: false
  },
  {
    id: 'e2',
    name: 'Tech Pulse',
    description: 'Tech professionals saving lives. Join our network of developers and designers.',
    members: Array(45).fill({}),
    donations: [],
    activityScore: 78,
    points: 850,
    distance: '3.5 km',
    isPrivate: false
  },
  {
    id: 'e3',
    name: 'University Lifeline',
    description: 'Student-led blood donation initiative. Open to all students and faculty.',
    members: Array(120).fill({}),
    donations: [],
    activityScore: 65,
    points: 420,
    distance: '0.8 km',
    isPrivate: false
  },
  {
    id: 'e4',
    name: 'Neighborhood Heroes',
    description: 'Local residents committed to maintaining a steady blood supply for our community hospital.',
    members: Array(8).fill({}),
    donations: [],
    activityScore: 45,
    points: 120,
    distance: '2.1 km',
    isPrivate: true
  }
];

interface ExploreProps {
  currentCircleId: string;
  onSwitchCircle: (circle: Circle) => void;
}

export const Explore: React.FC<ExploreProps> = ({ currentCircleId, onSwitchCircle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSwitching, setIsSwitching] = useState<string | null>(null);

  const handleSwitch = (circle: Circle) => {
    setIsSwitching(circle.id);
    // Simulate a brief delay for the "switch" effect
    setTimeout(() => {
      onSwitchCircle(circle);
      setIsSwitching(null);
    }, 800);
  };

  const filteredCircles = EXPLORE_CIRCLES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCircles = [...EXPLORE_CIRCLES].sort((a, b) => b.activityScore - a.activityScore);

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-10 px-6">
      <header className="space-y-4">
        <h2 className="text-4xl font-bold tracking-tight">Explore Circles</h2>
        <p className="text-gray-500 max-w-2xl">
          Find active blood donation communities. You can be a member of one Circle at a time to focus your impact.
        </p>
        
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, location, or mission..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-red-500/50 transition-all text-lg"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Available Communities</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {filteredCircles.map((circle, idx) => {
              const isCurrent = circle.id === currentCircleId;
              const loading = isSwitching === circle.id;

              return (
                <motion.div
                  key={circle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "glass-card p-6 rounded-3xl flex flex-col gap-6 group transition-all",
                    isCurrent ? "border-red-500/40 bg-red-500/5" : "hover:bg-white/[0.07]"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                        isCurrent ? "bg-red-500 text-white" : "bg-red-500/10 text-red-500"
                      )}>
                        <Heart size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{circle.name}</h3>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                          <MapPin size={14} />
                          <span>{circle.distance} away</span>
                        </div>
                      </div>
                    </div>
                    {isCurrent && (
                      <div className="px-3 py-1 bg-red-500 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-red-500/20">
                        Your Current Circle
                      </div>
                    )}
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {circle.description}
                  </p>

                  <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-500" />
                      <span className="text-sm font-bold">{circle.members.length}</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-red-500" />
                      <span className="text-sm font-bold">{circle.activityScore}%</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Vitality</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleSwitch(circle)}
                    disabled={isCurrent || !!isSwitching}
                    className={cn(
                      "w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all",
                      isCurrent
                        ? "bg-white/5 text-gray-500 cursor-default"
                        : "bg-white/10 hover:bg-red-500 text-white shadow-lg hover:shadow-red-500/20"
                    )}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : isCurrent ? (
                      'You are in this Circle'
                    ) : (
                      <>
                        Switch to this Circle
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <Trophy size={16} className="text-yellow-500" />
            Inter-Circle Rankings
          </h3>
          <div className="glass-card rounded-3xl p-6 space-y-4">
            {sortedCircles.map((circle, idx) => (
              <div key={circle.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-gray-500 w-4">#{idx + 1}</span>
                  <span className="text-sm font-bold">{circle.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500" 
                      style={{ width: `${circle.activityScore}%` }} 
                    />
                  </div>
                  <span className="text-[10px] font-bold text-red-500">{circle.activityScore}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="glass-card p-6 rounded-3xl bg-gradient-to-br from-red-500/10 to-transparent border-red-500/20">
            <h4 className="font-bold text-sm mb-2">Weekly Challenge</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              The circle with the highest vitality increase this week wins exclusive badges and XP boosts for all members!
            </p>
          </div>
        </div>
      </div>

      {filteredCircles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Globe size={48} className="text-gray-700 mb-4" />
          <h3 className="text-xl font-bold text-gray-500">No Circles found</h3>
          <p className="text-gray-600 mt-2">Try searching for something else or create your own Circle.</p>
        </div>
      )}
    </div>
  );
};
