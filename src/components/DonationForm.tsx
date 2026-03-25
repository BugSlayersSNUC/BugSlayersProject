import React, { useState } from 'react';
import { Camera, QrCode, MapPin, Calendar, CheckCircle2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QRScanner } from './QRScanner';

interface DonationFormProps {
  onAdd: (donation: any) => void;
  onClose: () => void;
}

export const DonationForm: React.FC<DonationFormProps> = ({ onAdd, onClose }) => {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    type: 'Blood',
    date: new Date().toISOString().split('T')[0],
    proofType: null as 'camera' | 'qr' | null,
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
      status: 'pending'
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
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Type</label>
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 focus:outline-none focus:border-red-500/50"
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
            >
              <option value="Blood">Blood</option>
              <option value="Plasma">Plasma</option>
              <option value="Platelets">Platelets</option>
            </select>
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
        </div>

        <div className="pt-4">
          <label className="block text-xs uppercase tracking-wider text-gray-500 mb-3">Upload Proof</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={() => setFormData({...formData, proofType: 'camera'})}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${formData.proofType === 'camera' ? 'border-red-500 bg-red-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
            >
              <Camera size={24} className="mb-2" />
              <span className="text-xs">Photo Proof</span>
            </button>
            <button 
              type="button"
              onClick={() => setIsScanning(true)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all relative ${formData.proofType === 'qr' ? 'border-red-500 bg-red-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
            >
              {formData.proofType === 'qr' && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <QrCode size={24} className="mb-2" />
              <span className="text-xs">{formData.proofType === 'qr' ? 'QR Scanned' : 'Scan QR'}</span>
            </button>
          </div>
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
            className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition-colors text-sm font-bold shadow-lg shadow-red-500/20"
          >
            Submit Proof
          </button>
        </div>
      </form>
    </motion.div>
  );
};
