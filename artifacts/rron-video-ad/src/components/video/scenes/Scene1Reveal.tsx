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
        <div className="relative overflow-hidden group">
          <motion.img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="RRON Logo"
            className="w-[40vw] max-w-2xl object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] filter brightness-0 invert"
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Light sweep effect */}
          <motion.div 
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.4)] to-transparent skew-x-[-20deg]"
            initial={{ left: '-100%' }}
            animate={{ left: '200%' }}
            transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
            style={{ mixBlendMode: 'overlay' }}
          />
        </div>

        <motion.h2
          className="mt-8 text-[3vw] tracking-[0.4em] font-body font-light text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
        >
          PREMIUM RENT A CAR
        </motion.h2>
      </div>
    </motion.div>
  );
}
