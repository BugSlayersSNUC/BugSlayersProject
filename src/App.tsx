/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  Plus, 
  History, 
  TrendingUp, 
  Award,
  ChevronRight,
  Droplets,
  Droplet,
  Search,
  Compass,
  LayoutDashboard,
  LogOut,
  Info,
  Heart,
  MessageSquare,
  Globe,
  User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HeartbeatVisual } from './components/HeartbeatVisual';
import { DonationForm } from './components/DonationForm';
import { Leaderboard } from './components/Leaderboard';
import { Auth } from './components/Auth';
import { Explore } from './components/Explore';
import { HealthInfo } from './components/HealthInfo';
import { Community } from './components/Community';
import { Rewards } from './components/Rewards';
import { Chatbot } from './components/Chatbot';
import { LanguageSelector } from './components/LanguageSelector';
import { Circle, Donation, User } from './types';
import { useTranslation } from 'react-i18next';
import { cn } from './lib/utils';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const MOCK_MEMBERS: User[] = [
  { id: 'u1', name: 'Alex', totalDonations: 12, regularityScore: 95, lastDonationDate: '2024-03-20' },
  { id: 'u2', name: 'Sarah', totalDonations: 8, regularityScore: 88, lastDonationDate: '2024-03-22' },
  { id: 'u3', name: 'Mike', totalDonations: 5, regularityScore: 45, lastDonationDate: '2024-01-10' },
  { id: 'u4', name: 'Emma', totalDonations: 15, regularityScore: 98, lastDonationDate: '2024-03-24' },
  { id: 'u5', name: 'John', totalDonations: 2, regularityScore: 20, lastDonationDate: '2023-12-05' },
];

export const MOCK_CIRCLES: Circle[] = [
  {
    id: '1',
    name: 'Red Lifeline',
    members: MOCK_MEMBERS.slice(0, 4),
    donations: [
      { id: 'd1', userId: 'u1', userName: 'Alex', date: '2024-03-20', location: 'Central Blood Bank', type: 'Blood', status: 'verified' },
      { id: 'd2', userId: 'u2', userName: 'Sarah', date: '2024-03-22', location: 'Red Cross Center', type: 'Plasma', status: 'verified' },
      { id: 'd4', userId: 'u4', userName: 'Emma', date: '2024-03-24', location: 'City Hospital', type: 'Blood', status: 'pending' },
    ],
    activityScore: 85,
    points: 1250
  },
  {
    id: '2',
    name: 'Impact Squad',
    members: MOCK_MEMBERS.slice(3, 5),
    donations: [
      { id: 'd3', userId: 'u4', userName: 'Emma', date: '2024-02-15', location: 'Metro Clinic', type: 'Blood', status: 'verified' },
    ],
    activityScore: 20,
    points: 450
  },
  {
    id: 'e1',
    name: 'Downtown Donors',
    description: 'A community of regular donors in the city center. We organize bi-weekly trips to the central bank.',
    members: [
      { id: 'u10', name: 'James', totalDonations: 10, regularityScore: 88 },
      { id: 'u11', name: 'Linda', totalDonations: 7, regularityScore: 92 },
      { id: 'u12', name: 'Robert', totalDonations: 4, regularityScore: 75 },
    ],
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
    members: [
      { id: 'u20', name: 'Kevin', totalDonations: 15, regularityScore: 98 },
      { id: 'u21', name: 'Sophia', totalDonations: 3, regularityScore: 40 },
    ],
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
    members: [
      { id: 'u30', name: 'Chris', totalDonations: 2, regularityScore: 30 },
      { id: 'u31', name: 'Anna', totalDonations: 1, regularityScore: 10 },
    ],
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
    members: [
      { id: 'u40', name: 'David', totalDonations: 5, regularityScore: 60 },
    ],
    donations: [],
    activityScore: 45,
    points: 120,
    distance: '2.1 km',
    isPrivate: true
  }
];

const CHART_DATA = [
  { name: 'Mon', activity: 40 },
  { name: 'Tue', activity: 30 },
  { name: 'Wed', activity: 65 },
  { name: 'Thu', activity: 85 },
  { name: 'Fri', activity: 70 },
  { name: 'Sat', activity: 90 },
  { name: 'Sun', activity: 85 },
];

type View = 'dashboard' | 'explore' | 'info' | 'community' | 'rewards';

export default function App() {
  const { t, i18n } = useTranslation();
  const [session, setSession] = useState<Session | null>(null);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [circlePoints, setCirclePoints] = useState<number>(0);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeCircle, setActiveCircle] = useState<Circle>(MOCK_CIRCLES[0]);
  const [isAddingDonation, setIsAddingDonation] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchUserPoints(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchUserPoints(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserPoints = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('points, current_circle')
        .eq('id', userId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') { // Record not found
          // Create the user record if it doesn't exist
          const { error: insertError } = await supabase
            .from('users')
            .insert({ id: userId, points: 0, current_circle: 'Red Lifeline' });
          
          if (insertError) {
            console.error('Error creating user record:', insertError);
          } else {
            setUserPoints(0);
            // Add to Red Lifeline circle_members
            await joinCircleInDB(userId, 'Red Lifeline');
          }
        } else {
          console.error('Error fetching points:', error);
        }
        return;
      }
      
      if (data) {
        setUserPoints(data.points || 0);
        if (data.current_circle) {
          const circle = MOCK_CIRCLES.find(c => c.name === data.current_circle);
          if (circle) setActiveCircle(circle);
        }
      }
    } catch (err) {
      console.error('Error in fetchUserPoints:', err);
    }
  };

  const joinCircleInDB = async (userId: string, circleName: string) => {
    try {
      const { data: circleData, error: fetchError } = await supabase
        .from('circles')
        .select('circle_members')
        .eq('name', circleName)
        .maybeSingle();
      
      if (fetchError) throw fetchError;
      
      if (circleData) {
        const members = circleData.circle_members || [];
        if (!members.includes(userId)) {
          const { error: updateError } = await supabase
            .from('circles')
            .update({ circle_members: [...members, userId] })
            .eq('name', circleName);
          
          if (updateError) throw updateError;
        }
      }
    } catch (err) {
      console.error('Error joining circle in DB:', err);
    }
  };

  const leaveCircleInDB = async (userId: string, circleName: string) => {
    try {
      const { data: circleData, error: fetchError } = await supabase
        .from('circles')
        .select('circle_members')
        .eq('name', circleName)
        .maybeSingle();
      
      if (fetchError) throw fetchError;
      
      if (circleData) {
        const members = circleData.circle_members || [];
        if (members.includes(userId)) {
          const { error: updateError } = await supabase
            .from('circles')
            .update({ circle_members: members.filter((id: string) => id !== userId) })
            .eq('name', circleName);
          
          if (updateError) throw updateError;
        }
      }
    } catch (err) {
      console.error('Error leaving circle in DB:', err);
    }
  };

  useEffect(() => {
    const fetchCircleData = async () => {
      try {
        const { data, error } = await supabase
          .from('circles')
          .select('points')
          .eq('name', activeCircle.name)
          .maybeSingle();
        
        if (data) {
          setCirclePoints(data.points);
        }
      } catch (err) {
        console.error('Error fetching circle data:', err);
      }
    };

    if (session) {
      fetchCircleData();
    }
  }, [session, activeCircle.name]);

  const [dbDonations, setDbDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('*');
      
      if (data) {
        const formatted: Donation[] = data.map(d => ({
          id: d.id,
          userId: d.user_id,
          userName: 'You', // In a real app, join with users table
          date: d.donation_date,
          location: d.donation_center,
          type: d.blood_type as any,
          amount: d.amount_ml,
          status: d.status as any
        }));
        setDbDonations(formatted);
      }
    };

    fetchDonations();
  }, [session]);

  const totalVolume = useMemo(() => 
    dbDonations.reduce((sum, d) => sum + (d.amount || 0), 0),
  [dbDonations]);

  const circleLivesImpacted = useMemo(() => 
    (activeCircle.donations.filter(d => d.status === 'verified').length + dbDonations.length) * 3,
  [activeCircle, dbDonations]);

  const userLivesImpacted = 36; // Mocked for the current user

  const handleAddDonation = async (newDonation: any) => {
    if (!session) return;

    try {
      // Fetch user's last donation to calculate bonus
      const { data: lastDonations, error: fetchError } = await supabase
        .from('donations')
        .select('donation_date')
        .eq('user_id', session.user.id)
        .order('donation_date', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      const { count: donationCount, error: countError } = await supabase
        .from('donations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      if (countError) throw countError;

      const now = new Date();
      const lastDate = lastDonations && lastDonations.length > 0 ? new Date(lastDonations[0].donation_date) : null;
      
      let bonusPercent = 0;
      let streak = donationCount || 0;

      if (lastDate) {
        const diffMonths = (now.getFullYear() - lastDate.getFullYear()) * 12 + (now.getMonth() - lastDate.getMonth());
        
        if (diffMonths >= 24) {
          streak = 0;
          bonusPercent = 0;
        } else if (diffMonths >= 12) {
          // Bonus not applied until the user has donated at least once
          bonusPercent = 0;
          // Streak is preserved but inactive for this donation? 
          // Usually this means the streak resets or this one is 0 and it restarts.
          // The prompt says "After 12 months, the bonus will not be applied until the user has donated at least once"
          // This implies this donation gets 0% bonus.
        } else {
          // Normal streak bonus
          if (streak === 1) bonusPercent = 5;
          else if (streak === 2) bonusPercent = 10;
          else if (streak >= 3) bonusPercent = 15;
        }
      }

      const basePoints = 200;
      const earnedPoints = Math.round(basePoints * (1 + bonusPercent / 100));

      const { data, error } = await supabase
        .from('donations')
        .insert({
          user_id: session.user.id,
          amount_ml: newDonation.amount,
          donation_center: newDonation.location,
          blood_type: newDonation.type,
          donation_date: newDonation.date,
          status: newDonation.status
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        // Fetch latest points from DB to avoid overwriting with stale state
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('points')
          .eq('id', session.user.id)
          .single();

        const currentPoints = (userData?.points || 0);
        const newTotalPoints = currentPoints + earnedPoints;

        // Update user points using upsert to handle missing records
        const { error: updateError } = await supabase
          .from('users')
          .upsert({ id: session.user.id, points: newTotalPoints });

        if (updateError) throw updateError;

        setUserPoints(newTotalPoints);

        // Update circle points
        const { data: circleData, error: circleFetchError } = await supabase
          .from('circles')
          .select('points')
          .eq('name', activeCircle.name)
          .maybeSingle();
        
        if (!circleFetchError && circleData) {
          const newCirclePoints = (circleData.points || 0) + earnedPoints;
          await supabase
            .from('circles')
            .update({ points: newCirclePoints })
            .eq('name', activeCircle.name);
          
          setCirclePoints(newCirclePoints);
        }

        const formatted: Donation = {
          id: data.id,
          userId: data.user_id,
          userName: 'You',
          date: data.donation_date,
          location: data.donation_center,
          type: data.blood_type as any,
          amount: data.amount_ml,
          status: data.status as any
        };
        setDbDonations(prev => [formatted, ...prev]);
        
        // Update local active circle state for immediate feedback
        setActiveCircle(prev => ({
          ...prev,
          activityScore: Math.min(100, prev.activityScore + 5)
        }));
      }
    } catch (err) {
      console.error('Error adding donation:', err);
    }
  };

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-black/40 border-r border-white/5 p-6 flex flex-col gap-8 sticky top-0 h-auto lg:h-screen">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
            <Activity className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">PulseLink</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Social Impact Engine</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-2 ml-2">Navigation</p>
          <NavButton 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')}
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />
          <NavButton 
            active={currentView === 'explore'} 
            onClick={() => setCurrentView('explore')}
            icon={<Compass size={18} />}
            label="Explore"
          />
          <NavButton 
            active={currentView === 'info'} 
            onClick={() => setCurrentView('info')}
            icon={<Info size={18} />}
            label="Health Info"
          />
          <NavButton 
            active={currentView === 'community'} 
            onClick={() => setCurrentView('community')}
            icon={<MessageSquare size={18} />}
            label={t('nav.community')}
          />
          <NavButton 
            active={currentView === 'rewards'} 
            onClick={() => setCurrentView('rewards')}
            icon={<Award size={18} />}
            label={t('nav.rewards')}
          />
        </nav>

        <nav className="flex flex-col gap-2">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-2 ml-2">Your Circle</p>
          <button
            onClick={() => setCurrentView('dashboard')}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl transition-all group bg-white/10 border border-white/10",
              currentView !== 'dashboard' && "opacity-60 hover:opacity-100"
            )}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-2 h-2 rounded-full",
                activeCircle.activityScore > 70 ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" :
                activeCircle.activityScore > 30 ? "bg-yellow-500" : "bg-red-500"
              )} />
              <span className="font-medium text-sm">{activeCircle.name}</span>
            </div>
            <ChevronRight size={16} className={cn(
              "transition-transform",
              currentView === 'dashboard' ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
            )} />
          </button>
          <p className="text-[10px] text-gray-500 px-4 mt-2 italic">
            You can switch your Circle in the Explore tab.
          </p>
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500" />
              <div>
                <p className="text-sm font-bold">{session.user.user_metadata.username || session.user.email}</p>
                <div className="flex items-center gap-1 text-[10px] text-red-500 font-bold">
                  <Heart size={10} fill="currentColor" />
                  <span>{userLivesImpacted} Lives Impacted</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-gray-400">
              <span>Level 12</span>
              <span>2,450 XP</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-red-500 w-[65%]" />
            </div>
          </div>
            <LanguageSelector />
          <button 
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest ml-2"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' ? (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 lg:p-10"
            >
              <div className="max-w-6xl mx-auto space-y-10">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-4 text-red-500 mb-2">
                      <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
                        <Users size={14} />
                        <span>{activeCircle.members.length} Members</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded-full">
                        <Heart size={12} fill="currentColor" />
                        <span>{circleLivesImpacted} Lives Saved</span>
                      </div>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">{activeCircle.name}</h2>
                  </div>
                  <button 
                    onClick={() => setIsAddingDonation(true)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-500/20 active:scale-95"
                  >
                    <Plus size={20} />
                    Log New Donation
                  </button>
                </header>

                {/* Vitality Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1 glass-card rounded-3xl overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                    <HeartbeatVisual score={activeCircle.activityScore} />
                  </div>

                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <StatCard icon={<Droplet className="text-red-500" />} label="Total Volume" value={`${totalVolume} ml`} />
                      <StatCard icon={<TrendingUp className="text-green-500" />} label="Activity Score" value={`${activeCircle.activityScore}%`} />
                      <StatCard icon={<Award className="text-yellow-500" />} label="Circle Points" value={circlePoints.toLocaleString()} />
                      <StatCard icon={<UserIcon className="text-blue-500" />} label="My Points" value={userPoints.toLocaleString()} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-card rounded-3xl p-6 h-[300px]">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Activity Pulse</h3>
                          <div className="flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="w-2 h-2 rounded-full bg-white/10" />
                          </div>
                        </div>
                        <div className="h-[200px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={CHART_DATA}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                              <XAxis 
                                dataKey="name" 
                                stroke="#ffffff30" 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={false} 
                              />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#151515', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                itemStyle={{ color: '#ef4444' }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="activity" 
                                stroke="#ef4444" 
                                strokeWidth={3} 
                                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <Leaderboard members={activeCircle.members} />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <History size={20} className="text-gray-500" />
                      Recent Donations
                    </h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                      <input 
                        type="text" 
                        placeholder="Search activity..." 
                        className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-red-500/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <AnimatePresence mode="popLayout">
                      {dbDonations.length > 0 ? dbDonations.map((donation, idx) => (
                        <motion.div
                          key={donation.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="glass-card p-4 rounded-2xl flex items-center justify-between group hover:bg-white/[0.07] transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                              <Droplets size={24} />
                            </div>
                            <div>
                              <p className="font-bold text-sm">{donation.userName}</p>
                              <p className="text-xs text-gray-500">{donation.location} • {donation.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-mono text-gray-400">{donation.date}</p>
                            <span className={cn(
                              "text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full mt-1 inline-block",
                              donation.status === 'verified' ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                            )}>
                              {donation.status}
                            </span>
                          </div>
                        </motion.div>
                      )) : (
                        <div className="text-center py-10 text-gray-500 italic text-sm">
                          No recent donations found.
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </section>
              </div>
            </motion.div>
          ) : currentView === 'explore' ? (
            <motion.div
              key="explore"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Explore 
                currentCircleId={activeCircle.id} 
                onSwitchCircle={async (newCircle) => {
                  const oldCircle = activeCircle;
                  setActiveCircle(newCircle);
                  setCurrentView('dashboard');
                  
                  if (session) {
                    // Update user's current circle
                    await supabase
                      .from('users')
                      .update({ current_circle: newCircle.name })
                      .eq('id', session.user.id);
                    
                    // Update circle memberships
                    await leaveCircleInDB(session.user.id, oldCircle.name);
                    await joinCircleInDB(session.user.id, newCircle.name);
                  }
                }} 
              />
            </motion.div>
          ) : currentView === 'community' ? (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Community />
            </motion.div>
          ) : currentView === 'rewards' ? (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Rewards 
                circle={{ ...activeCircle, points: userPoints }} 
                onUpdateCircle={async (updated) => {
                  setActiveCircle(updated);
                  setUserPoints(updated.points);
                  if (session) {
                    await supabase
                      .from('users')
                      .upsert({ id: session.user.id, points: updated.points });
                  }
                }} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <HealthInfo />
            </motion.div>
          )}
        </AnimatePresence>
        <Chatbot />
      </main>

      {/* Overlay Form */}
      <AnimatePresence>
        {isAddingDonation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingDonation(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <DonationForm 
              onAdd={handleAddDonation} 
              onClose={() => setIsAddingDonation(false)} 
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl transition-all font-bold text-sm",
        active ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}
