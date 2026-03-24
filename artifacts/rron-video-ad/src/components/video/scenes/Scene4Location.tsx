import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene4Location() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[var(--color-bg-dark)]"
      {...sceneTransitions.morphExpand}
    >
      {/* Background location image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 4, ease: 'easeOut' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}location-bg.png`}
          alt="Kosovo Location"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <div className="relative z-20 flex flex-col items-center">
        {/* Map Pin */}
        <motion.div
          className="relative w-[15vw] h-[15vw] flex items-center justify-center mb-8"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring', bounce: 0.6 }}
        >
          {/* Ping circles */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
          />
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 2 }}
          />
          
          <svg viewBox="0 0 24 24" className="w-[10vw] h-[10vw] text-[var(--color-primary)] drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] fill-current">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </motion.div>

        <motion.div
          className="flex items-center gap-[2vw] overflow-hidden"
        >
          <motion.h2
            className="font-display text-[7vw] text-white tracking-wider"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            FERIZAJ
          </motion.h2>
          <motion.div
            className="w-[1vw] h-[1vw] bg-[var(--color-secondary)] rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          <motion.h2
            className="font-display text-[7vw] text-white tracking-wider"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            PRISHTINË
          </motion.h2>
        </motion.div>

        <motion.p
          className="font-body text-[3vw] text-[var(--color-secondary)] mt-4 tracking-[0.3em] font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          KOSOVO
        </motion.p>
      </div>
    </motion.div>
  );
}
