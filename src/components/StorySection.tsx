import { useRef } from 'react';
import { motion } from 'framer-motion';

const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const text = "Life is an incredible journey filled with moments that define who we are. Surround yourself with people who lift you higher, dream big, and never lose your spark. Here is to the memories we have made and the adventures yet to come. Keep pushing boundaries and leveling up every single day!";
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.9,
      rotate: 5
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 max-w-6xl mx-auto relative z-10">
      <div className="relative">
        {/* Comic shadow block */}
        <div className="absolute inset-0 bg-[#1a1a2e] rounded-[2rem] transform translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8" />
        
        <div className="bg-[#fdfbf7] p-8 md:p-16 rounded-[2rem] border-4 border-[#1a1a2e] relative overflow-hidden">
          {/* Comic Dots Background */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#1a1a2e 3px, transparent 3px)', backgroundSize: '30px 30px' }} />
          
          {/* Decorative elements */}
          <div className="absolute top-8 left-8 w-24 h-24 bg-[#FFB5E8] rounded-full mix-blend-multiply opacity-80 animate-pulse border-2 border-[#1a1a2e]" />
          <div className="absolute bottom-8 right-8 w-32 h-32 bg-[#85E3FF] rounded-full mix-blend-multiply opacity-80 animate-pulse delay-700 border-2 border-[#1a1a2e]" />
          
          <div className="relative z-10">
            <div className="inline-block bg-[#1a1a2e] text-[#E7FFAC] px-6 py-2 transform -rotate-2 mb-12 border-2 border-[#E7FFAC] shadow-[4px_4px_0_#FFB5E8]">
              <h2 className="font-mono text-lg tracking-[0.2em] uppercase font-black">
                my love
              </h2>
            </div>
            
            <motion.p 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-serif text-3xl md:text-5xl md:leading-snug text-[#1a1a2e] flex flex-wrap gap-x-3 gap-y-2 md:gap-y-4 font-bold"
            >
              {words.map((word, i) => {
                // Highlight certain words with comic style
                const isHighlight = ["happiest", "21st", "love"].includes(word.toLowerCase().replace(/[^\w]/g, ''));
                
                return (
                  <motion.span 
                    key={i} 
                    variants={wordVariants}
                    className={`inline-block ${isHighlight ? 'text-[#FF6B6B] drop-shadow-[2px_2px_0_#1a1a2e]' : ''}`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
