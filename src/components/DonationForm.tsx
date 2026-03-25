import React, { useState } from 'react';
import { Camera, QrCode, MapPin, Calendar, CheckCircle2, Check, Edit3, Droplet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QRScanner } from './QRScanner';
import { cn } from '../lib/utils';

interface DonationFormProps {
  onAdd: (donation: any) => void;
  onClose: () => void;
}

export const DonationForm: React.FC<DonationFormProps> = ({ onAdd, onClose }) => {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    type: 'Blood' as const,
    amount: 450, // Default amount in ml
    date: new Date().toISOString().split('T')[0],
    proofType: null as 'camera' | 'qr' | 'manual' | null,
    qrData: null as string | null
  });

  const handleQRScan = (data: string) => {
    setFormData(prev => ({ ...prev, proofType: 'qr', qrData: data }));
    setIsScanning(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      userName: 'You',
      status: formData.proofType === 'manual' ? 'verified' : 'pending'
    });
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl w-full max-w-md"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <CheckCircle2 className="text-red-500" />
        Log Donation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Donation Site</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              required
              placeholder="e.g. City Hospital"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-red-500/50 transition-colors"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Amount (ml)</label>
            <div className="relative">
              <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="number" 
                required
                min="1"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:border-red-500/50"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="date" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:border-red-500/50"
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>
        </div>

        <div className="pt-4">
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-3">Upload Proof</label>
          <div className="grid grid-cols-3 gap-3">
            <button 
              type="button"
              onClick={() => setFormData({...formData, proofType: 'camera'})}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${formData.proofType === 'camera' ? 'border-red-500 bg-red-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
            >
              <Camera size={20} className="mb-2" />
              <span className="text-[10px] font-bold uppercase">Photo</span>
            </button>
            <button 
              type="button"
              onClick={() => setIsScanning(true)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all relative ${formData.proofType === 'qr' ? 'border-red-500 bg-red-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
            >
              {formData.proofType === 'qr' && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <Check size={10} className="text-white" />
                </div>
              )}
              <QrCode size={20} className="mb-2" />
              <span className="text-[10px] font-bold uppercase">{formData.proofType === 'qr' ? 'Scanned' : 'Scan QR'}</span>
            </button>
            <button 
              type="button"
              onClick={() => setFormData({...formData, proofType: 'manual'})}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${formData.proofType === 'manual' ? 'border-red-500 bg-red-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
            >
              <Edit3 size={20} className="mb-2" />
              <span className="text-[10px] font-bold uppercase">Manual</span>
            </button>
          </div>
          {formData.proofType === 'manual' && (
            <p className="mt-2 text-[10px] text-yellow-500 font-medium italic">
              Manual entries are for testing and will be marked as verified automatically.
            </p>
          )}
        </div>

        <AnimatePresence>
          {isScanning && (
            <QRScanner 
              onScan={handleQRScan} 
              onClose={() => setIsScanning(false)} 
            />
          )}
        </AnimatePresence>

        <div className="flex gap-3 pt-6">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={!formData.proofType}
            className={cn(
              "flex-1 py-3 rounded-xl transition-all text-sm font-bold shadow-lg",
              formData.proofType 
                ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20" 
                : "bg-white/5 text-gray-500 cursor-not-allowed shadow-none"
            )}
          >
            Submit
          </button>
        </div>
      </form>
    </motion.div>
  );
};
