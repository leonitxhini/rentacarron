import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene6Outro() {
  const tagline = "DRIVE WITH PRESTIGE".split(' ');

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-transparent"
      {...sceneTransitions.zoomThrough}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center px-[8vw]">

        {/* Logo scales in from 0 with spring */}
        <motion.div
          className="relative mb-[10vh] w-full flex justify-center"
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="RRON Logo"
            className="w-[80vmin] object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.6)] filter brightness-0 invert"
          />
          {/* Blue shine sweep */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[rgba(59,130,246,0.6)] to-transparent skew-x-[-20deg]"
            initial={{ left: '-100%' }}
            animate={{ left: '200%' }}
            transition={{ duration: 2.5, delay: 1.2, ease: 'easeInOut' }}
            style={{ mixBlendMode: 'overlay' }}
          />
        </motion.div>

        {/* Clips in word by word */}
        <div className="flex gap-[3vw] mb-[8vh] overflow-hidden">
          {tagline.map((word, i) => (
            <motion.h2
              key={i}
              className="font-display text-[9vmin] tracking-[0.2em] text-white/90"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.h2>
          ))}
        </div>

        {/* Horizontal blue line draws across center */}
        <motion.div
          className="h-[3px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent mb-[10vh] shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '80vw', opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: 'easeInOut' }}
        />

        <div className="flex flex-col items-center gap-[3vh]">
          <motion.p
            className="font-display text-[9vmin] text-[var(--color-primary)] tracking-widest drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            +383 48 188 415
          </motion.p>

          <motion.p
            className="font-body text-[4vmin] text-white/40 tracking-[0.3em] font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            FERIZAJ · PRISHTINË
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
