import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

interface Wish {
  id: number;
  text: string;
  color: string;
  x: number;
  y: number;
  rotation: number;
}

const WishWall: React.FC<{ isUnlocked: boolean }> = ({ isUnlocked }) => {
  const [wishes, setWishes] = useState<Wish[]>([
    { id: 1, text: "May you always keep leveling up! 🚀", color: '#FFB5E8', x: -100, y: -50, rotation: -5 },
    { id: 2, text: "To many more amazing adventures! ✨", color: '#85E3FF', x: 120, y: -30, rotation: 8 },
    { id: 3, text: "Stay awesome and keep inspiring! 🤍", color: '#E7FFAC', x: 20, y: 60, rotation: -3 },
  ]);
  const [input, setInput] = useState('');

  const colors = ['#FFB5E8', '#B28DFF', '#85E3FF', '#E7FFAC', '#FFC9AF'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newWish: Wish = {
      id: Date.now(),
      text: input.trim(),
      color: colors[Math.floor(Math.random() * colors.length)],
      // Random position in the center area
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 100,
      rotation: (Math.random() - 0.5) * 20,
    };

    setWishes([...wishes, newWish]);
    setInput('');
  };

  if (!isUnlocked) return null;

  return (
    <section className="py-24 px-6 relative z-10 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-block bg-[#1a1a2e] text-[#E7FFAC] px-6 py-2 transform rotate-2 mb-6 border-2 border-[#E7FFAC] shadow-[4px_4px_0_#FFB5E8]">
          <h2 className="font-mono text-lg tracking-[0.2em] uppercase font-black flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> The Wish Wall <Sparkles className="w-5 h-5" />
          </h2>
        </div>
        <p className="font-serif text-2xl text-[#1a1a2e] mb-12">
          Type a wish and stick it to the wall!
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your wish here..."
            maxLength={60}
            className="w-full sm:w-96 px-6 py-4 border-4 border-[#1a1a2e] bg-white font-mono text-lg shadow-[4px_4px_0_#1a1a2e] focus:outline-none focus:shadow-[6px_6px_0_#1a1a2e] transition-all text-[#1a1a2e] placeholder-gray-400"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#1a1a2e] text-white border-4 border-[#1a1a2e] px-8 py-4 font-mono font-bold uppercase tracking-widest shadow-[4px_4px_0_#FFB5E8] interactive hover:translate-y-1 hover:shadow-[0px_0px_0_#FFB5E8] transition-all flex items-center justify-center gap-2"
          >
            Post <Send className="w-5 h-5" />
          </button>
        </form>

        {/* The Wall */}
        <div className="relative bg-[#fdfbf7] border-4 border-[#1a1a2e] rounded-[2rem] h-[500px] shadow-[12px_12px_0_#1a1a2e] overflow-hidden corkboard">
          {/* Corkboard pattern */}
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'radial-gradient(#1a1a2e 2px, transparent 2px)', backgroundSize: '16px 16px' }} />

          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-mono text-sm text-gray-400 uppercase tracking-widest pointer-events-none">
              [ Drag notes around ]
            </p>
          </div>

          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              className="absolute p-6 w-56 border-2 border-[#1a1a2e] shadow-[6px_6px_0_#1a1a2e] cursor-grab active:cursor-grabbing"
              style={{
                backgroundColor: wish.color,
                rotate: wish.rotation,
                x: wish.x,
                y: wish.y,
              }}
              drag
              dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
              dragElastic={0.1}
              whileHover={{ scale: 1.05, zIndex: 50 }}
              whileDrag={{ scale: 1.1, zIndex: 100, boxShadow: "10px 10px 0px rgba(26, 26, 46, 1)" }}
            >
              {/* Pushpin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FF6B6B] rounded-full border-2 border-[#1a1a2e] shadow-sm z-10">
                <div className="w-1 h-1 bg-white rounded-full top-0.5 left-0.5 absolute" />
              </div>

              <p className="font-sans text-xl font-bold text-[#1a1a2e] text-center leading-snug" style={{ fontFamily: "'Frederickathe Great', cursive" }}>
                {wish.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WishWall;
