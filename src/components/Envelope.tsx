import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Trigger confetti burst from the center
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#FFB5E8', '#B28DFF', '#85E3FF', '#E7FFAC']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#FFB5E8', '#B28DFF', '#85E3FF', '#E7FFAC']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  return (
    <div className="relative w-80 h-56 perspective-[1500px] cursor-none interactive group" 
         onClick={handleOpen}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      
      {/* Comic-style emphasis lines on hover */}
      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -inset-12 z-0 pointer-events-none"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-12 bg-[#FFB5E8] origin-bottom rounded-full"
                style={{ 
                  rotate: i * 45,
                  y: '-100%',
                  x: '-50%'
                }}
                animate={{ 
                  y: ['-100%', '-150%'],
                  opacity: [1, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 0.6,
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="w-full h-full relative transform-style-3d z-10"
        animate={{ 
          rotateX: isOpen ? 15 : (isHovered ? 5 : 0),
          rotateY: isHovered && !isOpen ? [0, -2, 2, -2, 0] : 0,
          y: isOpen ? 40 : (isHovered ? -10 : 0),
          scale: isOpen ? 1.1 : 1
        }}
        transition={{ 
          rotateY: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          duration: 0.5 
        }}
      >
        {/* Back of envelope */}
        <div className="absolute inset-0 bg-[#f0eadd] rounded-lg shadow-2xl border-2 border-[#1a1a2e] z-0" />
        
        {/* Letter inside */}
        <motion.div 
          className="absolute inset-x-4 top-4 bottom-4 bg-white rounded shadow-sm flex flex-col items-center justify-center border-2 border-[#1a1a2e] overflow-hidden"
          animate={{ 
            y: isOpen ? -180 : 0,
            opacity: isOpen ? 1 : 0,
            rotate: isOpen ? -2 : 0,
            scale: isOpen ? 1.1 : 1,
            zIndex: isOpen ? 40 : 5 // Pops out in front of flaps when opened
          }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.4 }}
        >
          {/* Comic dots pattern background */}
          <div className="absolute inset-0 opacity-10" 
               style={{ backgroundImage: 'radial-gradient(#1a1a2e 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
          
          <div className="relative z-10 text-center p-4 bg-white/90 w-full h-full flex flex-col items-center justify-center">
            <h3 className="font-serif text-4xl text-[#1a1a2e] mb-2 font-bold transform -rotate-2">For You</h3>
            <div className="h-1 w-16 bg-[#FFB5E8] mb-2 rounded-full" />
            <p className="font-mono text-xs mt-2 text-[#1a1a2e] font-bold uppercase tracking-widest bg-[#E7FFAC] px-2 py-1 rounded border border-[#1a1a2e]">
              Top Secret 🤫🤫
            </p>
          </div>
        </motion.div>

        {/* Left flap */}
        <div 
          className="absolute inset-0 bg-[#fdfbf7] border-2 border-[#1a1a2e] rounded-lg z-10"
          style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}
        />
        
        {/* Right flap */}
        <div 
          className="absolute inset-0 bg-[#fdfbf7] border-2 border-[#1a1a2e] rounded-lg z-10"
          style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }}
        />
        
        {/* Bottom flap */}
        <div 
          className="absolute inset-0 bg-[#f8f4eb] border-2 border-[#1a1a2e] rounded-lg shadow-[0_-4px_15px_rgba(0,0,0,0.1)] z-20"
          style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
        />

        {/* Top flap (opens) */}
        <motion.div 
          className="absolute inset-0 bg-[#fdfbf7] border-2 border-[#1a1a2e] rounded-t-lg origin-top z-30"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut", type: "spring", bounce: 0.3 }}
        >
          {/* Inner pattern of top flap when open */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300" style={{ opacity: isOpen ? 0.1 : 0, backgroundImage: 'radial-gradient(#1a1a2e 1px, transparent 1px)', backgroundSize: '10px 10px', transform: 'rotateX(180deg)' }} />
        </motion.div>

        {/* Wax seal */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-20 h-20 bg-[#FF6B6B] rounded-full flex items-center justify-center shadow-[0_5px_15px_rgba(255,107,107,0.4)] border-4 border-[#1a1a2e] interactive"
          animate={{ 
            scale: isOpen ? 0 : (isHovered ? 1.1 : 1),
            opacity: isOpen ? 0 : 1,
            rotate: isHovered ? [0, -10, 10, -10, 0] : 0
          }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 1.5 },
            scale: { duration: 0.2 },
            opacity: { duration: 0.3 }
          }}
        >
          <Heart className="text-white w-10 h-10 fill-white" />
          <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-[2px] top-1 left-1 w-16 h-16" />
        </motion.div>
      </motion.div>
      
      {/* "Click Me" hint */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <div className="bg-[#1a1a2e] text-white font-mono text-xs px-4 py-2 rounded-full font-bold tracking-widest relative">
              CLICK TO BREAK SEAL
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[#1a1a2e]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Envelope;
