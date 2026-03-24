import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene1Reveal() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-10"
      {...sceneTransitions.zoomThrough}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Dramatic light sweep wrapper */}
        <div className="relative overflow-hidden">
          <motion.img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="RRON Logo"
            className="w-[38vw] max-w-2xl object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.4)] filter brightness-0 invert"
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(12px) brightness(0) invert(1)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px) brightness(0) invert(1)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Blue light sweep — no gold */}
          <motion.div
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[rgba(59,130,246,0.35)] to-transparent skew-x-[-20deg]"
            initial={{ left: '-100%' }}
            animate={{ left: '200%' }}
            transition={{ duration: 2, delay: 0.6, ease: 'easeInOut' }}
            style={{ mixBlendMode: 'overlay' }}
          />
        </div>

        <motion.div
          className="mt-6 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
        >
          <span className="w-12 h-[1px] bg-[var(--color-primary)] inline-block" />
          <span className="text-[2.5vw] tracking-[0.4em] font-body font-light text-white/70">PREMIUM RENT A CAR</span>
          <span className="w-12 h-[1px] bg-[var(--color-primary)] inline-block" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="font-body text-[1.2vw] text-white/30 tracking-[0.3em] mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          FERIZAJ · PRISHTINË · KOSOVO
        </motion.p>
      </div>
    </motion.div>
  );
}
