import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CandleSectionProps {
  onAllOut?: () => void;
}

const CandleSection: React.FC<CandleSectionProps> = ({ onAllOut }) => {
  const [candles, setCandles] = useState([
    { id: 1, isLit: true, x: -60, height: 120, color: '#FFB5E8' },
    { id: 2, isLit: true, x: -20, height: 150, color: '#85E3FF' },
    { id: 3, isLit: true, x: 20, height: 130, color: '#E7FFAC' },
    { id: 4, isLit: true, x: 60, height: 100, color: '#B28DFF' },
  ]);
  
  const [isBlowing, setIsBlowing] = useState(false);
  const [allOut, setAllOut] = useState(false);

  const handleBlow = () => {
    setIsBlowing(true);
    
    // Extinguish candles one by one
    candles.forEach((candle, index) => {
      setTimeout(() => {
        setCandles(prev => prev.map(c => c.id === candle.id ? { ...c, isLit: false } : c));
      }, index * 200 + Math.random() * 200);
    });

    setTimeout(() => {
      setIsBlowing(false);
    }, 1500);
  };

  const relight = () => {
    setCandles(prev => prev.map(c => ({ ...c, isLit: true })));
    setAllOut(false);
  };

  // Check if all are out to trigger celebration
  useEffect(() => {
    if (candles.every(c => !c.isLit) && !allOut) {
      setAllOut(true);
      if (onAllOut) onAllOut();
      
      // Big confetti celebration
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 10,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
          colors: ['#FFB5E8', '#B28DFF', '#85E3FF', '#E7FFAC']
        });
        confetti({
          particleCount: 10,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
          colors: ['#FFB5E8', '#B28DFF', '#85E3FF', '#E7FFAC']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [candles, allOut]);

  return (
    <section className="py-24 px-6 relative z-10 bg-[#FFB5E8]/20 border-y-4 border-[#1a1a2e] overflow-hidden my-20 candle-area">
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(45deg, #1a1a2e 25%, transparent 25%, transparent 75%, #1a1a2e 75%, #1a1a2e), linear-gradient(45deg, #1a1a2e 25%, transparent 25%, transparent 75%, #1a1a2e 75%, #1a1a2e)', backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px' }} />
      
      <div className="max-w-4xl mx-auto text-center relative z-20">
        <h2 className="font-serif text-5xl md:text-7xl text-[#1a1a2e] mb-4">Make a Wish</h2>
        <p className="font-mono text-sm tracking-widest uppercase text-[#1a1a2e] font-bold mb-16">
          {allOut ? "WISH GRANTED!" : "Blow out the candles"}
        </p>

        <div className="relative h-64 flex items-end justify-center mb-12">
          {/* Cake Base */}
          <div className="absolute bottom-0 w-64 h-24 bg-[#fdfbf7] border-4 border-[#1a1a2e] rounded-xl shadow-[8px_8px_0px_rgba(26,26,46,0.2)]">
            <div className="absolute top-4 left-0 w-full h-4 bg-[#FFB5E8] border-y-2 border-[#1a1a2e]" />
            <div className="absolute top-12 left-0 w-full h-4 bg-[#85E3FF] border-y-2 border-[#1a1a2e]" />
          </div>

          {/* Candles */}
          {candles.map((candle) => (
            <div 
              key={candle.id}
              className="absolute bottom-24 w-6 border-2 border-[#1a1a2e] rounded-t-sm"
              style={{ 
                height: `${candle.height}px`, 
                transform: `translateX(${candle.x}px)`,
                backgroundColor: candle.color
              }}
            >
              {/* Wick */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-[#1a1a2e]" />
              
              {/* Flame */}
              <AnimatePresence>
                {candle.isLit && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [1, 1.1, 0.9, 1.2, 1],
                      rotate: isBlowing ? -45 : [-2, 2, -1, 3, 0]
                    }}
                    exit={{ scale: 0, opacity: 0, y: -20 }}
                    transition={{ 
                      scale: { repeat: isBlowing ? 0 : Infinity, duration: 0.5, ease: "easeInOut" },
                      rotate: { repeat: Infinity, duration: 0.2, ease: "easeInOut" }
                    }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 text-[#FF6B6B]"
                  >
                    <Flame className="w-8 h-8 fill-[#FFC9AF]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Smoke when out */}
              <AnimatePresence>
                {!candle.isLit && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 0.5, 0], y: -50, scale: 2 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-400 blur-sm"
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {!allOut ? (
          <button 
            onClick={handleBlow}
            disabled={isBlowing}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-white bg-[#1a1a2e] border-4 border-[#1a1a2e] rounded-full overflow-hidden interactive hover:text-[#1a1a2e] transition-colors"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-[#E7FFAC] group-hover:translate-x-0" />
            <span className="relative flex items-center gap-2 uppercase tracking-widest text-lg">
              <Wind className={`w-6 h-6 ${isBlowing ? 'animate-bounce' : ''}`} /> 
              Blow!
            </span>
          </button>
        ) : (
          <motion.button 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={relight}
            className="px-8 py-4 font-mono font-bold text-[#1a1a2e] bg-white border-4 border-[#1a1a2e] rounded-full interactive shadow-[6px_6px_0px_#1a1a2e] hover:translate-y-1 hover:shadow-[2px_2px_0px_#1a1a2e] transition-all uppercase tracking-widest"
          >
            Do it again
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default CandleSection;
