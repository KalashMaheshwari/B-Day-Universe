import { motion } from 'framer-motion';

const BlobBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#fdfbf7]">
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FFB5E8] opacity-30 blur-[80px]"
      />
      <motion.div
        animate={{
          x: [0, -100, 100, 0],
          y: [0, 150, -50, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#85E3FF] opacity-30 blur-[80px]"
      />
      <motion.div
        animate={{
          x: [0, 50, -100, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.4, 0.8, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-[#B28DFF] opacity-30 blur-[80px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 50, 0],
          y: [0, -80, 80, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[#E7FFAC] opacity-30 blur-[80px]"
      />
    </div>
  );
};

export default BlobBackground;
