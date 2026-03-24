import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene4Location() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-transparent"
      {...sceneTransitions.morphExpand}
    >
      {/* Background location image full portrait */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-[#050a15]/40 to-[#050a15]" />
      </motion.div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full">
        {/* Map Pin */}
        <motion.div
          className="relative w-[30vmin] h-[30vmin] flex items-center justify-center mb-[8vh]"
          initial={{ y: -100, scale: 0, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring', bounce: 0.6 }}
        >
          {/* Ping circles */}
          <motion.div
            className="absolute inset-0 rounded-full border-[3px] border-[var(--color-primary)]"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-[3px] border-[var(--color-primary)]"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 2 }}
          />
          <motion.div
            className="absolute inset-0 bg-[var(--color-primary)] rounded-full blur-xl opacity-40"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <svg viewBox="0 0 24 24" className="w-[18vmin] h-[18vmin] fill-[var(--color-primary)] drop-shadow-[0_0_20px_rgba(59,130,246,1)] relative z-10">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </motion.div>

        <div className="flex flex-col items-center gap-[3vh] mb-[6vh] overflow-hidden px-[10vw]">
          <motion.h2
            className="font-display text-[18vmin] text-white tracking-widest leading-none text-center drop-shadow-2xl"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
          >
            FERIZAJ
          </motion.h2>
          
          <motion.div
            className="w-[20vw] h-[4px] bg-[var(--color-primary)] shadow-[0_0_20px_rgba(59,130,246,0.9)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          />
          
          <motion.h2
            className="font-display text-[18vmin] text-white tracking-widest leading-none text-center drop-shadow-2xl"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, type: 'spring' }}
          >
            PRISHTINË
          </motion.h2>
        </div>

        <motion.p
          className="font-body text-[6vmin] text-[var(--color-primary)] mt-[2vh] tracking-[0.4em] font-medium drop-shadow-xl"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
        >
          KOSOVO
        </motion.p>
      </div>
    </motion.div>
  );
}
