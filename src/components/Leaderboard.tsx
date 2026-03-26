import React from 'react';
import { Trophy, Medal, Award, TrendingUp, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { User } from '../types';
import { cn } from '../lib/utils';

interface LeaderboardProps {
  members: User[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ members }) => {
  const sortedMembers = [...members]
    .filter(m => m && m.name) // Filter out invalid members
    .sort((a, b) => (b.regularityScore || 0) - (a.regularityScore || 0));

  return (
    <div className="glass-card rounded-3xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
          <Trophy size={16} className="text-yellow-500" />
          Circle Leaderboard
        </h3>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {sortedMembers.length > 0 ? sortedMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "flex items-center justify-between p-3 rounded-2xl transition-all",
              index === 0 ? "bg-yellow-500/10 border border-yellow-500/20" : 
              index === 1 ? "bg-gray-400/10 border border-gray-400/20" :
              index === 2 ? "bg-orange-500/10 border border-orange-500/20" :
              "bg-white/5 border border-transparent"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center font-mono text-xs font-bold text-gray-500">
                {index === 0 ? <Medal className="text-yellow-500" size={20} /> :
                 index === 1 ? <Medal className="text-gray-400" size={20} /> :
                 index === 2 ? <Medal className="text-orange-500" size={20} /> :
                 `#${index + 1}`}
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-sm font-bold">
                {member.name[0]}
              </div>
              <div>
                <p className="text-sm font-bold">{member.name}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                  {member.totalDonations} Donations
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 justify-end text-green-500">
                <TrendingUp size={12} />
                <span className="text-sm font-mono font-bold">{member.regularityScore}%</span>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Regularity</p>
            </div>
          </motion.div>
        )) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-600 italic text-sm py-10">
            <Users size={32} className="opacity-20 mb-2" />
            No members in this circle yet.
          </div>
        )}
      </div>
    </div>
  );
};
