import { motion } from 'framer-motion';

const Ticker = () => {
  const wishes = [
    "Happy Birthday!", "POW!", 
    "Another year of being awesome", "BAM!", 
    "Keep shining bright", "ZAP!", 
    "More life, more blessings", "BOOM!",
    "Cheers to the best guy", "CRASH!",
    "Let's party hard today", "WHAM!",
    "Wishing you the world", "SMASH!"
  ];

  return (
    <div className="w-full py-6 md:py-8 bg-[#1a1a2e] text-[#fdfbf7] overflow-hidden flex whitespace-nowrap border-y-8 border-[#FFB5E8] transform -rotate-2 scale-105 z-20 relative shadow-[0_10px_0_rgba(26,26,46,0.2)]">
      {/* Comic dots overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fdfbf7 2px, transparent 2px)', backgroundSize: '15px 15px' }} />
           
      <motion.div
        className="flex space-x-12 items-center"
        animate={{ x: [0, -2000] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20
        }}
      >
        {/* Duplicate array to create seamless loop */}
        {[...wishes, ...wishes, ...wishes, ...wishes].map((wish, index) => {
          const isComicWord = ["POW!", "BAM!", "ZAP!", "BOOM!", "CRASH!", "WHAM!", "SMASH!"].includes(wish);
          
          return (
            <span 
              key={index} 
              className={`
                ${isComicWord 
                  ? "text-[#E7FFAC] font-mono text-4xl md:text-6xl font-black transform rotate-6 drop-shadow-[4px_4px_0_#FFB5E8]" 
                  : "font-serif text-3xl md:text-5xl font-bold tracking-wide"}
                flex-shrink-0 relative z-10
              `}
            >
              {wish}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Ticker;
