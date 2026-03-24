import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene6Outro() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#050a15]"
      {...sceneTransitions.zoomThrough}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">

        <motion.div
          className="relative mb-[4vh]"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="RRON Logo"
            className="w-[30vw] max-w-xl object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.25)] filter brightness-0 invert"
          />
          {/* Blue shine sweep — no gold */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[rgba(59,130,246,0.5)] to-transparent skew-x-[-20deg]"
            initial={{ left: '-100%' }}
            animate={{ left: '200%' }}
            transition={{ duration: 2.5, delay: 1, ease: 'easeInOut' }}
            style={{ mixBlendMode: 'overlay' }}
          />
        </motion.div>

        <motion.h2
          className="font-display text-[4vw] tracking-[0.2em] text-white/90 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          DRIVE WITH PRESTIGE
        </motion.h2>

        {/* Blue divider line — no gold */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent mb-6"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '40vw', opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeInOut' }}
        />

        <motion.p
          className="font-body text-[1.8vw] text-[var(--color-primary)] font-medium tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          +383 48 188 415
        </motion.p>

        <motion.p
          className="font-body text-[1.2vw] text-white/30 mt-2 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          FERIZAJ · PRISHTINË · KOSOVO
        </motion.p>
      </div>
    </motion.div>
  );
}
