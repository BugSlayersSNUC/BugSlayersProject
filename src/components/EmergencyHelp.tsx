import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  Users, 
  MapPin, 
  Phone, 
  Droplet, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  HeartHandshake,
  X
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { EmergencyRequest } from '../types';
import { cn } from '../lib/utils';

export const EmergencyHelp: React.FC = () => {
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    bloodType: '',
    location: '',
    urgency: 'high' as EmergencyRequest['urgency'],
    contactInfo: ''
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUserId(session.user.id);
    });

    fetchRequests();

    // Real-time subscription
    const channel = supabase
      .channel('emergency_requests')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'emergency_requests' 
      }, () => {
        fetchRequests();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('emergency_requests')
        .select('*')
        .eq('status', 'active')
        .order('timestamp', { ascending: false });

      if (error) throw error;
      if (data) {
        setRequests(data.map(r => ({
          id: r.id,
          userId: r.user_id,
          userName: r.user_name || 'Anonymous',
          bloodType: r.blood_type,
          location: r.location,
          urgency: r.urgency,
          status: r.status,
          contactInfo: r.contact_info,
          timestamp: r.timestamp,
          volunteersCount: r.volunteers_count || 0
        })));
      }
    } catch (err) {
      console.error('Error fetching emergency requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestHelp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setSubmitting(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userName = userData.user?.user_metadata?.username || userData.user?.email || 'Anonymous';

      const { error } = await supabase
        .from('emergency_requests')
        .insert({
          user_id: userId,
          user_name: userName,
          blood_type: formData.bloodType,
          location: formData.location,
          urgency: formData.urgency,
          contact_info: formData.contactInfo,
          status: 'active',
          volunteers_count: 0,
          timestamp: new Date().toISOString()
        });

      if (error) throw error;
      setIsRequesting(false);
      setFormData({ bloodType: '', location: '', urgency: 'high', contactInfo: '' });
      fetchRequests();
    } catch (err) {
      console.error('Error creating emergency request:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVolunteer = async (requestId: string, currentCount: number) => {
    try {
      const { error } = await supabase
        .from('emergency_requests')
        .update({ volunteers_count: currentCount + 1 })
        .eq('id', requestId);

      if (error) throw error;
      fetchRequests();
    } catch (err) {
      console.error('Error volunteering:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
            <AlertTriangle size={16} />
            <span>Emergency Response Network</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight">Ask for Help</h2>
          <p className="text-gray-400 max-w-md">
            In case of urgent blood requirement, post a request. Volunteers in your area will be notified immediately.
          </p>
        </div>
        <button 
          onClick={() => setIsRequesting(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-red-500/20 active:scale-95"
        >
          <Plus size={24} />
          Create Emergency Request
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-red-500" size={40} />
          </div>
        ) : requests.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {requests.map((request, idx) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  "glass-card p-6 rounded-3xl border-l-4 transition-all",
                  request.urgency === 'critical' ? "border-l-red-600" : 
                  request.urgency === 'high' ? "border-l-orange-500" : "border-l-yellow-500"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xl">
                        {request.bloodType}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{request.userName} needs help</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> {request.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {new Date(request.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={cn(
                        "text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full",
                        request.urgency === 'critical' ? "bg-red-500/10 text-red-500" : 
                        request.urgency === 'high' ? "bg-orange-500/10 text-orange-500" : "bg-yellow-500/10 text-yellow-500"
                      )}>
                        {request.urgency} Urgency
                      </span>
                      <span className="bg-blue-500/10 text-blue-500 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Users size={10} /> {request.volunteersCount} Volunteers Responded
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a 
                      href={`tel:${request.contactInfo}`}
                      className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all"
                    >
                      <Phone size={20} />
                    </a>
                    <button 
                      onClick={() => handleVolunteer(request.id, request.volunteersCount)}
                      className="bg-white/10 hover:bg-red-500 text-white px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 group"
                    >
                      <HeartHandshake size={20} className="group-hover:scale-110 transition-transform" />
                      I Can Help
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <CheckCircle2 size={48} className="mx-auto mb-4 text-green-500/20" />
            <p className="text-gray-500">No active emergency requests. Everything is calm.</p>
          </div>
        )}
      </div>

      {/* Request Form Modal */}
      <AnimatePresence>
        {isRequesting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRequesting(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#151515] rounded-3xl p-8 shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setIsRequesting(false)}
                className="absolute right-6 top-6 text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Request Emergency Help</h3>
                  <p className="text-sm text-gray-400">Provide details about the emergency to notify volunteers.</p>
                </div>

                <form onSubmit={handleRequestHelp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Blood Type</label>
                      <select 
                        required
                        value={formData.bloodType}
                        onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white"
                      >
                        <option value="" disabled>Select Type</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => (
                          <option key={t} value={t} className="bg-[#151515]">{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Urgency</label>
                      <select 
                        required
                        value={formData.urgency}
                        onChange={(e) => setFormData({...formData, urgency: e.target.value as any})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white"
                      >
                        <option value="critical" className="bg-[#151515]">Critical</option>
                        <option value="high" className="bg-[#151515]">High</option>
                        <option value="moderate" className="bg-[#151515]">Moderate</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Hospital / Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        required
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        placeholder="e.g. City General Hospital"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Contact Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                      <input 
                        required
                        type="tel"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                        placeholder="e.g. +1 234 567 890"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-white"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={20} /> : "Broadcast Emergency"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
