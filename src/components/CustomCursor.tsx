import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Play, Flame } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'camera' | 'play' | 'flame'>('default');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  const themeColor = '#1a1a2e';

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Update state for the trailing ring
      setMousePosition({ x, y });

      // Direct DOM update for inner dot (zero delay)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
      }

      // Spawn subtle dust particles
      if (Math.random() < 0.2) {
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1 - 0.5,
          size: Math.random() * 3 + 1,
          alpha: 0.8,
          color: themeColor
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest('.polaroid')) {
        setCursorType('camera');
      } else if (target.closest('video') || target.closest('.reel-player')) {
        setCursorType('play');
      } else if (target.closest('.candle-area')) {
        setCursorType('flame');
      } else if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive') ||
        target.closest('.interactive')
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    // Canvas Animation Loop for Trail
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
          particlesRef.current.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[98]"
      />
      
      {/* Outer Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-[#1a1a2e] rounded-full pointer-events-none z-[99] flex items-center justify-center bg-white/10 backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: cursorType !== 'default' ? 1.4 : 1,
          borderColor: cursorType === 'default' ? '#1a1a2e' : '#FFB5E8',
          backgroundColor: cursorType !== 'default' ? 'rgba(26, 26, 46, 0.05)' : 'rgba(255, 255, 255, 0.2)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
      >
        <AnimatePresence>
          {cursorType === 'camera' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Camera className="w-5 h-5 text-[#1a1a2e]" />
            </motion.div>
          )}
          {cursorType === 'play' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Play className="w-5 h-5 text-[#1a1a2e] fill-[#1a1a2e]" />
            </motion.div>
          )}
          {cursorType === 'flame' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Flame className="w-5 h-5 text-[#1a1a2e] fill-[#1a1a2e]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Cursor Dot Wrapper (Direct DOM position for zero delay) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-[100]"
        style={{ transform: 'translate(-100px, -100px)' }}
      >
        <motion.div
          className="w-full h-full rounded-full"
          animate={{
            scale: cursorType !== 'default' ? 0.3 : 1,
            backgroundColor: cursorType === 'default' ? '#1a1a2e' : '#FFB5E8',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.3 }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
