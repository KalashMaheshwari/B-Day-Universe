import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const GallerySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const images = [
    { src: "/gallery1.png", rotation: -6, x: -30, y: 10, caption: "Adventure" },
    { src: "/gallery1.png", rotation: 4, x: 20, y: -20, caption: "Dream" },
    { src: "/gallery1.png", rotation: -3, x: 10, y: 30, caption: "Create" },
    { src: "/gallery1.png", rotation: 8, x: -25, y: -10, caption: "Explore" },
    { src: "/gallery1.png", rotation: -5, x: 35, y: 15, caption: "Inspire" },
    { src: "/gallery1.png", rotation: 6, x: -15, y: -35, caption: "Imagine" },
    { src: "/gallery1.png", rotation: -8, x: 5, y: -25, caption: "Discover" },
    { src: "/gallery1.png", rotation: 3, x: -40, y: 25, caption: "Believe" },
    { src: "/gallery1.png", rotation: -4, x: 25, y: 35, caption: "Grow" },
    { src: "/gallery1.png", rotation: 7, x: 0, y: 0, caption: "Thrive" },
  ];

  return (
    <section ref={containerRef} className="py-32 px-6 relative z-10 overflow-hidden bg-gradient-to-b from-transparent to-[#fdfbf7]">
      {/* Comic-style background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#1a1a2e 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-24 text-center relative z-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-[#E7FFAC] px-6 py-2 rounded-full border-2 border-[#1a1a2e] mb-6 transform -rotate-2"
          >
            <span className="font-mono text-sm tracking-widest font-bold uppercase text-[#1a1a2e]">Drag 'em around!</span>
          </motion.div>
          <h2 className="font-serif text-6xl md:text-8xl text-[#1a1a2e] mb-4 relative">
            <span className="relative z-10">The Archives</span>
            <span className="absolute top-1 left-1 md:top-2 md:left-2 text-[#FFB5E8] -z-10">The Archives</span>
          </h2>
        </div>

        <div className="relative w-full max-w-6xl mx-auto h-[100vh] md:h-[80vh] flex items-center justify-center">
          {images.map((img, index) => (
            <PhotoCard key={index} {...img} index={index} total={images.length} containerRef={containerRef} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface PhotoCardProps {
  src: string;
  rotation: number;
  x: number;
  y: number;
  caption: string;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ src, rotation, x, y, caption, index, containerRef }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [zIndex, setZIndex] = useState(index);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setZIndex(100 + index); // Bring to absolute front when dragging
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Keep it slightly higher than others but not absolute top
    setZIndex(50 + index);
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute polaroid interactive cursor-grab active:cursor-grabbing border-2 border-[#1a1a2e]"
      style={{ zIndex }}
      initial={{ 
        rotate: rotation * 2, 
        x: `${x * 1.5}%`, 
        y: `${y * 1.5}%`,
        opacity: 0,
        scale: 0.5
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        rotate: rotation,
        x: `${x}%`,
        y: `${y}%`,
        transition: { 
          duration: 0.8, 
          delay: index * 0.1,
          type: "spring",
          bounce: 0.5
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: 1.15, 
        rotate: rotation > 0 ? rotation + 2 : rotation - 2,
        boxShadow: "10px 10px 0px rgba(26, 26, 46, 1)"
      }}
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={isDragging ? { scale: 1.2, boxShadow: "15px 15px 0px rgba(26, 26, 46, 1)" } : {}}
    >
      {/* Tape effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/50 backdrop-blur-sm border border-gray-200 transform -rotate-2 mix-blend-luminosity z-10" />
      
      <div className="w-40 h-48 md:w-56 md:h-64 overflow-hidden bg-[#f0eadd] pointer-events-none border-2 border-[#1a1a2e]">
        <img 
          src={src} 
          alt={caption} 
          className="w-full h-full object-cover filter contrast-125 saturate-110"
        />
      </div>
      <div className="mt-4 text-center pointer-events-none">
        <span className="font-sans text-2xl font-bold text-[#1a1a2e] tracking-tight" style={{ fontFamily: "'Caveat', cursive" }}>
          {caption}
        </span>
      </div>
    </motion.div>
  );
};

export default GallerySection;
