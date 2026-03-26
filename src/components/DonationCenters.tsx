import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Search, ExternalLink, Loader2, Info, Droplets } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Center {
  name: string;
  address: string;
  url: string;
  rating?: number;
  openNow?: boolean;
}

export const DonationCenters: React.FC = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [centers, setCenters] = useState<Center[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          console.error("Error getting geolocation:", err);
        }
      );
    }
  }, []);

  const searchCenters = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!location && !userCoords) {
      setError("Please enter a location or allow geolocation access.");
      return;
    }

    setLoading(true);
    setError(null);
    setCenters([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = location 
        ? `Find blood donation centers near ${location}. Provide a list with their names and addresses.`
        : `Find blood donation centers near my current location. Provide a list with their names and addresses.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: userCoords ? {
                latitude: userCoords.lat,
                longitude: userCoords.lng
              } : undefined
            }
          }
        },
      });

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      if (groundingChunks && groundingChunks.length > 0) {
        const foundCenters: Center[] = groundingChunks
          .filter(chunk => chunk.maps?.uri)
          .map(chunk => ({
            name: chunk.maps?.title || "Donation Center",
            address: chunk.maps?.title || "Address not specified",
            url: chunk.maps?.uri || "#"
          }));
        
        setCenters(foundCenters);
        if (foundCenters.length === 0) {
          setError("No donation centers found in this area. Try searching for a larger city nearby.");
        }
      } else {
        setError("Could not find any donation centers. Please try a different location.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10 px-6">
      <header className="text-center space-y-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-500 mb-2"
        >
          <MapPin size={32} />
        </motion.div>
        <h2 className="text-4xl font-bold tracking-tight">Find Donation Centers</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Locate the nearest blood banks and donation centers. Your contribution can save lives today.
        </p>
      </header>

      <form onSubmit={searchCenters} className="relative max-w-xl mx-auto">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={20} />
          <input 
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city, neighborhood, or zip code..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-32 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-white placeholder:text-gray-600"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white px-6 py-2 rounded-xl font-medium transition-all flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Search"}
          </button>
        </div>
        {userCoords && !location && (
          <button 
            type="button"
            onClick={() => searchCenters()}
            className="mt-3 text-xs text-gray-500 hover:text-red-400 flex items-center gap-1 mx-auto transition-colors"
          >
            <Navigation size={12} />
            Use my current location
          </button>
        )}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {centers.map((center, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-6 rounded-3xl group hover:border-red-500/30 transition-all"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg group-hover:text-red-400 transition-colors">{center.name}</h3>
                  <div className="flex items-start gap-2 text-gray-400 text-sm">
                    <MapPin size={16} className="shrink-0 mt-0.5" />
                    <p>{center.address}</p>
                  </div>
                </div>
                <a 
                  href={center.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-red-500 text-gray-400 hover:text-white rounded-2xl transition-all shrink-0"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm max-w-md mx-auto"
        >
          <Info size={18} />
          <p>{error}</p>
        </motion.div>
      )}

      {!loading && centers.length === 0 && !error && (
        <div className="text-center py-20 text-gray-600">
          <Droplets size={48} className="mx-auto mb-4 opacity-20" />
          <p>Search for centers to see them listed here.</p>
        </div>
      )}
    </div>
  );
};
