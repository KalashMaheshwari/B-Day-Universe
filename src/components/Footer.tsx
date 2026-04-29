import { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [roast, setRoast] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRoast = () => {
    const roasts = [
      "You're the reason they put directions on shampoo.",
      "I'd agree with you but then we'd both be wrong.",
      "You bring everyone so much joy... when you leave the room.",
      "You have miles to go before you reach mediocre.",
      "If laughter is the best medicine, your face must be curing the world."
    ];
    // Pick a random roast
    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
    setRoast(randomRoast);
    setTimeout(() => setRoast(null), 4000);
  };

  return (
    <footer className="py-24 px-6 relative z-10 border-t-4 border-[#1a1a2e] mt-20 bg-[#fdfbf7]">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none comic-dots" />
      
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        <div className="w-20 h-20 rounded-full bg-[#E7FFAC] flex items-center justify-center mb-8 border-4 border-[#1a1a2e] shadow-[6px_6px_0px_#1a1a2e] interactive hover:scale-110 transition-transform">
          <Sparkles className="w-10 h-10 text-[#1a1a2e]" />
        </div>
        
        <h2 className="font-serif text-5xl md:text-7xl text-[#1a1a2e] mb-6 font-bold transform -rotate-2">
          Happy Birthday!
        </h2>
        
        <p className="font-mono text-sm tracking-widest uppercase text-[#1a1a2e] mb-12 flex items-center gap-2 font-bold bg-[#FFB5E8] px-4 py-2 rounded-full border-2 border-[#1a1a2e]">
          Made with <Heart className="w-5 h-5 text-[#FF6B6B] fill-[#FF6B6B]" /> with love
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Send a Gift Button */}
          <div className="relative">
            <AnimatePresence>
              {copied && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: -40 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="absolute left-1/2 -translate-x-1/2 top-0 bg-[#E7FFAC] text-[#1a1a2e] font-mono text-xs font-bold px-3 py-1 rounded border-2 border-[#1a1a2e] whitespace-nowrap shadow-[2px_2px_0px_#1a1a2e]"
                >
                  Link Copied!
                </motion.div>
              )}
            </AnimatePresence>
            <button 
              onClick={handleCopy}
              className="w-full md:w-auto px-8 py-4 rounded-full bg-[#1a1a2e] text-[#fdfbf7] font-mono text-sm uppercase tracking-widest font-bold interactive hover:bg-[#B28DFF] hover:text-[#1a1a2e] hover:shadow-[6px_6px_0px_#1a1a2e] hover:-translate-y-1 transition-all border-4 border-[#1a1a2e]"
            >
              Send a Gift
            </button>
          </div>

          {/* Roast Him Button */}
          <div className="relative">
            <AnimatePresence>
              {roast && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: -80, scale: 1 }}
                  exit={{ opacity: 0, y: -70, scale: 0.9 }}
                  className="absolute left-1/2 -translate-x-1/2 top-0 bg-white text-[#1a1a2e] font-sans text-sm font-bold px-4 py-3 rounded-xl border-4 border-[#1a1a2e] w-64 shadow-[6px_6px_0px_#FFB5E8] z-50"
                >
                  "{roast}"
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#1a1a2e]" />
                </motion.div>
              )}
            </AnimatePresence>
            <button 
              onClick={handleRoast}
              className="w-full md:w-auto px-8 py-4 rounded-full bg-white text-[#1a1a2e] font-mono text-sm uppercase tracking-widest font-bold interactive hover:bg-[#FFB5E8] hover:shadow-[6px_6px_0px_#1a1a2e] hover:-translate-y-1 transition-all border-4 border-[#1a1a2e]"
            >
              Roast Him
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
