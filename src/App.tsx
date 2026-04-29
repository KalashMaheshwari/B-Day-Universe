import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

// Components
import Envelope from './components/Envelope';
import CustomCursor from './components/CustomCursor';
import BlobBackground from './components/BlobBackground';
import Ticker from './components/Ticker';
import HeroSection from './components/HeroSection';
import GallerySection from './components/GallerySection';
import StorySection from './components/StorySection';
import VideoSection from './components/VideoSection';
import CandleSection from './components/CandleSection';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import WishWall from './components/WishWall';

function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [isCandleOut, setIsCandleOut] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isEntered]);

  return (
    <div className="relative min-h-screen font-sans selection:bg-[#B28DFF] selection:text-white">
      <CustomCursor />
      <MusicPlayer isEntered={isEntered} />
      
      <AnimatePresence mode="wait">
        {!isEntered ? (
          <motion.div 
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#fdfbf7] overflow-hidden"
          >
            {/* Comic-style background for envelope */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(#1a1a2e 3px, transparent 3px)', backgroundSize: '40px 40px' }} />
                 
            <div className="absolute top-10 left-10 md:top-20 md:left-20 w-32 h-32 bg-[#FFB5E8] rounded-full mix-blend-multiply blur-xl opacity-50 animate-pulse" />
            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-40 h-40 bg-[#85E3FF] rounded-full mix-blend-multiply blur-xl opacity-50 animate-pulse delay-1000" />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ y: -50, opacity: 0, rotate: -5 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.5 }}
                className="mb-16 relative z-0"
              >
                <div className="absolute -inset-4 bg-[#E7FFAC] border-4 border-[#1a1a2e] transform rotate-2 z-0" />
                <h1 className="font-serif text-5xl md:text-8xl text-center text-[#1a1a2e] relative z-10 px-8 py-4 bg-white border-4 border-[#1a1a2e] shadow-[10px_10px_0px_#1a1a2e]">
                  INCOMING!
                </h1>
              </motion.div>
              
              <div className="relative z-50">
                <Envelope onOpen={() => setTimeout(() => setIsEntered(true), 1500)} />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-0"
          >
            <BlobBackground />
            
            <main className="relative z-10 w-full overflow-hidden">
              <HeroSection scrollYProgress={scrollYProgress} />
              
              <Ticker />
              
              <StorySection />
              
              <GallerySection />
              
              <VideoSection />
              
              <CandleSection onAllOut={() => setIsCandleOut(true)} />
              
              <WishWall isUnlocked={isCandleOut} />
              
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
