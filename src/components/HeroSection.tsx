import React, { useRef } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, Zap, Star } from 'lucide-react';

interface HeroSectionProps {
  scrollYProgress: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollYProgress }) => {
  const sectionRef = useRef<HTMLElement>(null);
  // Scroll Parallax
  const yText = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scaleScroll = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // 3D Tilt for the image container
  const rotateX = useTransform(springY, [-1, 1], [8, -8]);
  const rotateY = useTransform(springX, [-1, 1], [-8, 8]);
  
  // Floating elements parallax


  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden perspective-[2000px]"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Spotlight following mouse */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(circle at ${50 + (x as number) * 20}% ${50 + (y as number) * 20}%, #FFB5E8 0%, transparent 50%)`
          )
        }}
      />

      {/* Comic Half-tone Background Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-[0.04] z-0 pointer-events-none comic-dots" 
        style={{ x: useTransform(springX, [-1, 1], [-20, 20]), y: useTransform(springY, [-1, 1], [-20, 20]) }}
      />

      {/* Floating Comic Badges / Stickers */}
      <motion.div drag dragConstraints={sectionRef} dragElastic={0.1} className="absolute top-[15%] left-[10%] z-30 md:left-[20%] cursor-grab active:cursor-grabbing">
        <div className="bg-[#E7FFAC] border-4 border-[#1a1a2e] p-4 rounded-full transform -rotate-12 shadow-[6px_6px_0px_#1a1a2e] flex items-center justify-center interactive hover:scale-110 transition-transform">
          <Star className="w-8 h-8 text-[#1a1a2e] fill-[#1a1a2e]" />
        </div>
      </motion.div>

      <motion.div drag dragConstraints={sectionRef} dragElastic={0.1} className="absolute bottom-[20%] left-[15%] z-30 cursor-grab active:cursor-grabbing">
        <div className="bg-[#85E3FF] border-4 border-[#1a1a2e] px-6 py-2 transform rotate-6 shadow-[6px_6px_0px_#1a1a2e] interactive hover:scale-110 transition-transform">
          <span className="font-mono font-black text-[#1a1a2e] text-xl">100% AWESOME</span>
        </div>
      </motion.div>

      <motion.div drag dragConstraints={sectionRef} dragElastic={0.1} className="absolute top-[25%] right-[10%] md:right-[15%] z-30 cursor-grab active:cursor-grabbing">
        <div className="bg-[#FFB5E8] border-4 border-[#1a1a2e] p-5 rounded-full transform rotate-12 shadow-[6px_6px_0px_#1a1a2e] flex items-center justify-center interactive hover:scale-110 transition-transform">
          <Zap className="w-10 h-10 text-[#1a1a2e] fill-[#1a1a2e]" />
        </div>
      </motion.div>

      {/* Background Image Container with 3D Mouse Tilt & Scroll Parallax */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-10 transform-style-3d"
        style={{ y: yImage, scale: scaleScroll, rotateX, rotateY }}
      >
        <div className="relative w-full h-full max-w-5xl max-h-[80vh] mx-auto px-4 md:px-0 mt-12 md:mt-0">
          <motion.div 
            className="absolute inset-0 glass rounded-[2rem] md:rounded-[4rem] overflow-hidden border-4 border-[#1a1a2e] shadow-[20px_20px_0px_#FFB5E8]"
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.2 }}
          >
            {/* Comic-style frame inner border */}
            <div className="absolute inset-3 border-4 border-[#1a1a2e] rounded-[1.2rem] md:rounded-[3.2rem] z-20 pointer-events-none" />
            
            <img 
              src="/hero.png" 
              alt="Universe" 
              className="w-full h-full object-cover mix-blend-multiply opacity-95 filter contrast-125 saturate-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#B28DFF]/70 via-[#85E3FF]/30 to-[#E7FFAC]/20 mix-blend-hard-light" />
            
            {/* Comic Starburst */}
            <motion.div 
              className="absolute top-12 right-12 z-30 w-36 h-36 interactive"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              whileHover={{ scale: 1.2, rotate: 0 }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[#FFC9AF] stroke-[#1a1a2e] stroke-[3] drop-shadow-[4px_4px_0_#1a1a2e]">
                <polygon points="50,0 60,30 90,10 70,40 100,50 70,60 90,90 60,70 50,100 40,70 10,90 30,60 0,50 30,40 10,10 40,30" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono font-black text-[#1a1a2e] text-lg transform -rotate-12">
                VVIP!
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Foreground Text */}
      <motion.div 
        className="relative z-40 text-center w-full flex flex-col items-center"
        style={{ y: yText, opacity }}
      >
        <div className="flex flex-col items-center justify-center px-4 transform -rotate-2">
          
          {/* Happy Birthday Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            className="bg-[#1a1a2e] text-[#E7FFAC] border-4 border-[#1a1a2e] px-6 py-2 mb-2 shadow-[6px_6px_0px_#FFB5E8] transform rotate-3"
          >
            <h2 className="font-mono text-xl md:text-3xl font-black tracking-widest uppercase">
              Happy Birthday
            </h2>
          </motion.div>
          
          {/* Main Name */}
          <motion.div 
            className="relative inline-block mx-auto cursor-pointer interactive group mt-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, type: "spring", bounce: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              rotate: -2
            }}
          >
            {/* Front Layer: White fill, Dark stroke */}
            <span className="relative z-30 font-serif text-[18vw] md:text-[14vw] leading-none tracking-tighter text-[#fdfbf7] [-webkit-text-stroke:3px_#1a1a2e] md:[-webkit-text-stroke:5px_#1a1a2e] block">
              YOU
            </span>
            {/* Middle Layer: Pink fill, Dark stroke */}
            <span className="absolute top-1 left-1 md:top-2 md:left-2 z-20 font-serif text-[18vw] md:text-[14vw] leading-none tracking-tighter text-[#FFB5E8] [-webkit-text-stroke:3px_#1a1a2e] md:[-webkit-text-stroke:5px_#1a1a2e] block transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
              YOU
            </span>
            {/* Bottom Layer: Solid dark block shadow */}
            <span className="absolute top-2 left-2 md:top-4 md:left-4 z-10 font-serif text-[18vw] md:text-[14vw] leading-none tracking-tighter text-[#1a1a2e] block transition-transform group-hover:translate-x-2 group-hover:translate-y-2">
              YOU
            </span>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8, type: "spring", bounce: 0.6 }}
          className="flex items-center justify-center mt-8 md:mt-12 relative z-30"
          whileHover={{ scale: 1.1, rotate: -2 }}
        >
          <div className="bg-white border-4 border-[#1a1a2e] px-8 py-3 transform rotate-3 shadow-[8px_8px_0px_#1a1a2e] flex items-center gap-3 interactive cursor-pointer">
            <Sparkles className="w-6 h-6 text-[#FFB5E8] fill-[#FFB5E8]" />
            <p className="font-mono text-lg md:text-2xl tracking-[0.2em] text-[#1a1a2e] uppercase font-black">
              Leveling Up
            </p>
            <Sparkles className="w-6 h-6 text-[#85E3FF] fill-[#85E3FF]" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
