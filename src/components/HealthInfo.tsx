import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldAlert, CheckCircle, Info, Droplets, Zap } from 'lucide-react';

export const HealthInfo: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10 px-6">
      <header className="text-center space-y-4">
        <h2 className="text-4xl font-bold tracking-tight">Donation Knowledge Base</h2>
        <p className="text-gray-500">Everything you need to know about being a life-saver.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-3xl space-y-6"
        >
          <div className="flex items-center gap-3 text-red-500">
            <Heart size={24} />
            <h3 className="text-xl font-bold">Benefits of Donating</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <CheckCircle className="text-green-500 shrink-0" size={20} />
              <p className="text-sm text-gray-300"><span className="font-bold text-white">Save Lives:</span> One donation can save up to three lives. Your blood is separated into components (red cells, plasma, platelets).</p>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="text-green-500 shrink-0" size={20} />
              <p className="text-sm text-gray-300"><span className="font-bold text-white">Free Health Check:</span> Every donor receives a mini-physical, checking pulse, blood pressure, body temperature, and hemoglobin levels.</p>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="text-green-500 shrink-0" size={20} />
              <p className="text-sm text-gray-300"><span className="font-bold text-white">Heart Health:</span> Regular donation is linked to lower blood pressure and a lower risk for heart attacks.</p>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="text-green-500 shrink-0" size={20} />
              <p className="text-sm text-gray-300"><span className="font-bold text-white">Burn Calories:</span> Donating a pint of blood burns about 650 calories as the body works to replenish it.</p>
            </li>
          </ul>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-3xl space-y-6"
        >
          <div className="flex items-center gap-3 text-orange-500">
            <ShieldAlert size={24} />
            <h3 className="text-xl font-bold">Risks & Side Effects</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <Info className="text-blue-500 shrink-0" size={20} />
              <p className="text-sm text-gray-300"><span className="font-bold text-white">Temporary Fatigue:</span> You may feel slightly tired or lightheaded immediately after donating. Resting and hydrating is key.</p>
            </li>
            <li className="flex gap-3">
              <Info className="text-blue-500 shrink-0" size={20} />
              <p className="text-sm text-gray-300"><span className="font-bold text-white">Bruising:</span> Some donors experience minor bruising at the needle site, which typically fades within a few days.</p>
            </li>
            <li className="flex gap-3">
              <Info className="text-blue-500 shrink-0" size={20} />
              <p className="text-sm text-gray-300"><span className="font-bold text-white">Iron Levels:</span> Frequent donation can lower iron levels. We recommend iron-rich foods or supplements for regular donors.</p>
            </li>
          </ul>
        </motion.section>
      </div>

      <section className="glass-card p-8 rounded-3xl">
        <div className="flex items-center gap-3 text-blue-500 mb-8">
          <Zap size={24} />
          <h3 className="text-xl font-bold">Preparation & Recovery</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500">Before</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Drink plenty of water, eat a healthy meal (avoid fatty foods), and get a good night's sleep.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500">During</h4>
            <p className="text-xs text-gray-400 leading-relaxed">The actual donation takes about 8-10 minutes. Relax, listen to music, or chat with the staff.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm uppercase tracking-widest text-gray-500">After</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Have a snack and drink. Avoid heavy lifting or intense exercise for the next 24 hours.</p>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center gap-4 pt-10">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500">
          <Droplets size={32} />
        </div>
        <p className="text-center text-gray-500 text-sm italic max-w-md">
          "The blood you donate gives someone another chance at life. One day that someone may be a close relative, a friend, a loved one—or even you."
        </p>
      </div>
    </div>
  );
};
