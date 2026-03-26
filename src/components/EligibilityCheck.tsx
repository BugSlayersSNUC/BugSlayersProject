import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Heart, 
  Scale, 
  Clock, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Info
} from 'lucide-react';

interface HealthData {
  age: string;
  weight: string;
  height: string;
  heartRate: string;
  sleepHours: string;
  isFeelingWell: boolean;
  hasRecentTattoo: boolean;
  onMedication: boolean;
}

interface EligibilityResult {
  eligible: boolean;
  reasons: string[];
  warnings: string[];
}

export const EligibilityCheck: React.FC = () => {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [data, setData] = useState<HealthData>({
    age: '',
    weight: '',
    height: '',
    heartRate: '',
    sleepHours: '',
    isFeelingWell: true,
    hasRecentTattoo: false,
    onMedication: false,
  });

  const [result, setResult] = useState<EligibilityResult | null>(null);

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const checkEligibility = () => {
    const reasons: string[] = [];
    const warnings: string[] = [];
    
    const age = parseInt(data.age);
    const weight = parseFloat(data.weight);
    const height = parseFloat(data.height);
    const heartRate = parseInt(data.heartRate);
    const sleep = parseFloat(data.sleepHours);

    // Age check
    if (age < 18) reasons.push("You must be at least 18 years old to donate.");
    if (age > 65) warnings.push("Donors over 65 may require additional medical clearance.");

    // Weight check
    if (weight < 50) reasons.push("Minimum weight for donation is 50kg (110 lbs).");

    // BMI check
    if (weight && height) {
      const bmi = calculateBMI(weight, height);
      if (bmi < 18.5) warnings.push("Your BMI is slightly low. Ensure you eat a hearty meal before donating.");
      if (bmi > 35) warnings.push("High BMI might make finding a suitable vein more challenging.");
    }

    // Heart rate check
    if (heartRate < 60 || heartRate > 100) {
      reasons.push("Normal resting heart rate for donation should be between 60 and 100 bpm.");
    }

    // Sleep check
    if (sleep < 6) reasons.push("You need at least 6-7 hours of sleep before donating to prevent fainting.");

    // General health
    if (!data.isFeelingWell) reasons.push("You must be in good health and feeling well on the day of donation.");
    if (data.hasRecentTattoo) reasons.push("Tattoos or piercings within the last 3-6 months may require a waiting period.");
    if (data.onMedication) warnings.push("Some medications (like antibiotics or blood thinners) may affect eligibility. Consult with the center staff.");

    setResult({
      eligible: reasons.length === 0,
      reasons,
      warnings
    });
    setStep('result');
  };

  const reset = () => {
    setStep('form');
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <AnimatePresence mode="wait">
        {step === 'form' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <header className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 mb-2">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Eligibility Pre-Check</h2>
              <p className="text-gray-400 text-sm">Quickly verify if you're ready to save a life today.</p>
            </header>

            <div className="glass-card p-8 rounded-3xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Activity size={14} /> Age
                  </label>
                  <input 
                    type="number"
                    value={data.age}
                    onChange={(e) => setData({...data, age: e.target.value})}
                    placeholder="e.g. 25"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Scale size={14} /> Weight (kg)
                  </label>
                  <input 
                    type="number"
                    value={data.weight}
                    onChange={(e) => setData({...data, weight: e.target.value})}
                    placeholder="e.g. 70"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Activity size={14} /> Height (cm)
                  </label>
                  <input 
                    type="number"
                    value={data.height}
                    onChange={(e) => setData({...data, height: e.target.value})}
                    placeholder="e.g. 175"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Heart size={14} /> Resting Heart Rate (bpm)
                  </label>
                  <input 
                    type="number"
                    value={data.heartRate}
                    onChange={(e) => setData({...data, heartRate: e.target.value})}
                    placeholder="e.g. 72"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Clock size={14} /> Sleep Last Night (hours)
                  </label>
                  <input 
                    type="number"
                    value={data.sleepHours}
                    onChange={(e) => setData({...data, sleepHours: e.target.value})}
                    placeholder="e.g. 8"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Toggle 
                  label="Are you feeling well today?" 
                  checked={data.isFeelingWell} 
                  onChange={(val) => setData({...data, isFeelingWell: val})} 
                />
                <Toggle 
                  label="Recent tattoo or piercing (last 6 months)?" 
                  checked={data.hasRecentTattoo} 
                  onChange={(val) => setData({...data, hasRecentTattoo: val})} 
                />
                <Toggle 
                  label="Are you currently on any medication?" 
                  checked={data.onMedication} 
                  onChange={(val) => setData({...data, onMedication: val})} 
                />
              </div>

              <button 
                onClick={checkEligibility}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group"
              >
                Verify Eligibility
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className={`glass-card p-10 rounded-3xl text-center space-y-6 border-2 ${result?.eligible ? 'border-green-500/30' : 'border-red-500/30'}`}>
              <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${result?.eligible ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {result?.eligible ? <ShieldCheck size={48} /> : <ShieldAlert size={48} />}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">
                  {result?.eligible ? "You're Eligible!" : "Not Eligible Today"}
                </h3>
                <p className="text-gray-400">
                  {result?.eligible 
                    ? "Based on your vitals, you're in great shape to donate." 
                    : "We recommend waiting or consulting a doctor before donating."}
                </p>
              </div>

              {result?.reasons && result.reasons.length > 0 && (
                <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 text-left space-y-3">
                  <h4 className="text-red-400 font-bold text-sm flex items-center gap-2">
                    <AlertCircle size={16} /> Requirements Not Met:
                  </h4>
                  <ul className="space-y-2">
                    {result.reasons.map((reason, i) => (
                      <li key={i} className="text-sm text-gray-400 flex gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result?.warnings && result.warnings.length > 0 && (
                <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-2xl p-6 text-left space-y-3">
                  <h4 className="text-yellow-400 font-bold text-sm flex items-center gap-2">
                    <Info size={16} /> Important Notes:
                  </h4>
                  <ul className="space-y-2">
                    {result.warnings.map((warning, i) => (
                      <li key={i} className="text-sm text-gray-400 flex gap-2">
                        <span className="text-yellow-500 mt-1">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-6 flex flex-col gap-3">
                {result?.eligible && (
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold transition-all">
                    Find Nearest Center
                  </button>
                )}
                <button 
                  onClick={reset}
                  className="w-full bg-white/5 hover:bg-white/10 text-gray-400 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={18} />
                  Start Over
                </button>
              </div>
            </div>

            <p className="text-center text-xs text-gray-600 px-10">
              Disclaimer: This is a preliminary check based on general guidelines. Final eligibility is determined by medical professionals at the donation center.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Toggle: React.FC<{ label: string, checked: boolean, onChange: (val: boolean) => void }> = ({ label, checked, onChange }) => (
  <button 
    onClick={() => onChange(!checked)}
    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
  >
    <span className="text-sm text-gray-300">{label}</span>
    <div className={`w-12 h-6 rounded-full transition-colors relative ${checked ? 'bg-blue-500' : 'bg-gray-700'}`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-7' : 'left-1'}`} />
    </div>
  </button>
);
