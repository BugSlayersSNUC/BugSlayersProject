import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Award, 
  Gift, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Clock, 
  Plus,
  ArrowRight,
  Vote,
  Trophy,
  History
} from 'lucide-react';
import { Circle, Reward, Nomination } from '../types';
import { cn } from '../lib/utils';

const MOCK_REWARDS: Reward[] = [
  {
    id: 'r1',
    title: 'Full Health Screening',
    description: 'Comprehensive blood test and health checkup at any partner diagnostic center.',
    pointsCost: 1500,
    imageUrl: 'https://picsum.photos/seed/screening/400/200',
    category: 'Benefit'
  },
  {
    id: 'r2',
    title: 'Premium Blood Donor Kit',
    description: 'Includes a high-quality stress ball, iron supplements, and a branded hydration bottle.',
    pointsCost: 800,
    imageUrl: 'https://picsum.photos/seed/kit/400/200',
    category: 'Product'
  },
  {
    id: 'r3',
    title: 'Charity Donation ($20)',
    description: 'We will donate $20 to the World Health Organization on behalf of your Circle.',
    pointsCost: 1000,
    imageUrl: 'https://picsum.photos/seed/charity/400/200',
    category: 'Donation'
  },
  {
    id: 'r4',
    title: 'Priority Booking Pass',
    description: 'Skip the queue at any partner blood bank for your next 3 donations.',
    pointsCost: 600,
    imageUrl: 'https://picsum.photos/seed/priority/400/200',
    category: 'Benefit'
  },
  {
    id: 'r5',
    title: 'Emergency Transport Fund',
    description: 'Contribute points to fund emergency blood transport services in rural areas.',
    pointsCost: 2000,
    imageUrl: 'https://picsum.photos/seed/ambulance/400/200',
    category: 'Donation'
  },
  {
    id: 'r6',
    title: 'Community Impact Badge',
    description: 'Exclusive digital badge and physical certificate for your Circle\'s contribution.',
    pointsCost: 400,
    imageUrl: 'https://picsum.photos/seed/badge/400/200',
    category: 'Product'
  }
];

const MOCK_NOMINATIONS: Nomination[] = [
  {
    id: 'n1',
    rewardId: 'r1',
    circleId: '1',
    nominatedBy: 'Alex',
    votes: ['u1', 'u2'],
    status: 'pending',
    timestamp: '2h ago'
  }
];

interface RewardsProps {
  circle: Circle;
  onUpdateCircle: (updated: Circle) => void;
}

export function Rewards({ circle, onUpdateCircle }: RewardsProps) {
  const { t } = useTranslation();
  const [nominations, setNominations] = useState<Nomination[]>(MOCK_NOMINATIONS);
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');

  const filteredRewards = useMemo(() => {
    if (selectedCategory === 'All') return MOCK_REWARDS;
    return MOCK_REWARDS.filter(r => r.category === selectedCategory);
  }, [selectedCategory]);

  const handleNominate = (reward: Reward) => {
    if (circle.points < reward.pointsCost) return;

    const newNomination: Nomination = {
      id: Math.random().toString(36).substr(2, 9),
      rewardId: reward.id,
      circleId: circle.id,
      nominatedBy: 'You',
      votes: ['current-user'],
      status: 'pending',
      timestamp: 'Just now'
    };

    setNominations([newNomination, ...nominations]);
  };

  const handleVote = (nominationId: string) => {
    const nomination = nominations.find(n => n.id === nominationId);
    if (!nomination || nomination.votes.includes('current-user')) return;

    const reward = MOCK_REWARDS.find(r => r.id === nomination.rewardId);
    if (!reward || circle.points < reward.pointsCost) return;

    const newVotes = [...nomination.votes, 'current-user'];

    if (newVotes.length >= 3 && reward && nomination.status === 'pending') {
      // Automatic redemption - update parent state outside of child state updater
      onUpdateCircle({
        ...circle,
        points: circle.points - reward.pointsCost
      });
      setNominations(prev => prev.map(nom => 
        nom.id === nominationId ? { ...nom, votes: newVotes, status: 'redeemed' } : nom
      ));
    } else {
      setNominations(prev => prev.map(nom => 
        nom.id === nominationId ? { ...nom, votes: newVotes } : nom
      ));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-red-500 mb-2">
          <Award size={20} />
          <span className="text-xs font-bold uppercase tracking-widest">{t('rewards.subtitle')}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">{t('rewards.title')}</h1>
            <p className="text-gray-400 max-w-xl">
              Your circle earns points for every verified donation. Nominate rewards and vote together to redeem them for the whole group.
            </p>
          </div>
          <div className="glass-card px-6 py-4 rounded-2xl flex items-center gap-4 border-red-500/20">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{t('rewards.points')}</p>
              <p className="text-2xl font-bold text-white">{circle.points.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content: Rewards Catalog */}
        <div className="lg:col-span-8 space-y-8">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['All', 'Donation', 'Benefit', 'Product'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                  selectedCategory === cat 
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/20" 
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {cat === 'All' ? 'All Rewards' : t(`rewards.categories.${cat}`)}
              </button>
            ))}
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRewards.map(reward => {
              const isNominated = nominations.some(n => n.rewardId === reward.id && n.status === 'pending');
              const canAfford = circle.points >= reward.pointsCost;

              return (
                <motion.div
                  key={reward.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-2xl overflow-hidden group border-white/5 hover:border-red-500/30 transition-colors"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={reward.imageUrl} 
                      alt={reward.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold text-white border border-white/10">
                      {reward.pointsCost} PTS
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                        {t(`rewards.categories.${reward.category}`)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{reward.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{reward.description}</p>
                    
                    <button
                      disabled={!canAfford || isNominated}
                      onClick={() => handleNominate(reward)}
                      className={cn(
                        "w-full py-2.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                        isNominated 
                          ? "bg-yellow-500/10 text-yellow-500 cursor-default"
                          : canAfford
                            ? "bg-white/10 hover:bg-red-500 text-white"
                            : "bg-white/5 text-gray-600 cursor-not-allowed"
                      )}
                    >
                      {isNominated ? (
                        <>
                          <Clock size={16} />
                          {t('rewards.nominated')}
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          {canAfford ? t('rewards.nominate') : t('rewards.no_points')}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Active Nominations & History */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Nominations */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Vote className="w-5 h-5 text-red-500" />
              Active Nominations
            </h3>
            
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {nominations.filter(n => n.status === 'pending').length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 text-gray-600">
                      <Clock size={20} />
                    </div>
                    <p className="text-xs text-gray-500">No active nominations. Be the first to nominate a reward!</p>
                  </div>
                ) : (
                  nominations.filter(n => n.status === 'pending').map(nom => {
                    const reward = MOCK_REWARDS.find(r => r.id === nom.rewardId);
                    const hasVoted = nom.votes.includes('current-user');
                    const canAfford = reward && circle.points >= reward.pointsCost;
                    const progress = (nom.votes.length / 3) * 100;

                    return (
                      <motion.div
                        key={nom.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-bold text-white">{reward?.title}</h4>
                            <p className="text-[10px] text-gray-500">Nominated by {nom.nominatedBy}</p>
                          </div>
                          <span className="text-[10px] font-mono text-gray-400">{nom.timestamp}</span>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                            <span className="text-gray-500">Votes: {nom.votes.length}/3</span>
                            <span className="text-red-500">{Math.round(progress)}%</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              className="h-full bg-red-500"
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => handleVote(nom.id)}
                          disabled={hasVoted || !canAfford}
                          className={cn(
                            "w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2",
                            hasVoted
                              ? "bg-green-500/10 text-green-500 cursor-default"
                              : canAfford
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-white/5 text-gray-600 cursor-not-allowed"
                          )}
                        >
                          {hasVoted ? (
                            <>
                              <CheckCircle2 size={14} />
                              {t('rewards.voted')}
                            </>
                          ) : canAfford ? (
                            <>
                              <Vote size={14} />
                              {t('rewards.vote')}
                            </>
                          ) : (
                            <>
                              <Clock size={14} />
                              {t('rewards.no_points')}
                            </>
                          )}
                        </button>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* History */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-gray-500" />
              {t('rewards.history')}
            </h3>
            <div className="space-y-4">
              {nominations.filter(n => n.status === 'redeemed').map(nom => {
                const reward = MOCK_REWARDS.find(r => r.id === nom.rewardId);
                return (
                  <div key={nom.id} className="flex items-center gap-3 p-3 bg-green-500/5 border border-green-500/10 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{reward?.title}</h4>
                      <p className="text-[10px] text-gray-400">Redeemed successfully</p>
                    </div>
                  </div>
                );
              })}
              {nominations.filter(n => n.status === 'redeemed').length === 0 && (
                <p className="text-xs text-gray-500 text-center py-4 italic">No redemptions yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
