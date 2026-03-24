import { motion } from 'framer-motion';
import { sceneTransitions, charVariants } from '@/lib/video/animations';

export function Scene1Reveal() {
  const title = "PREMIUM RENT A CAR";
  
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-10"
      {...sceneTransitions.zoomThrough}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center px-[8vmin]">
        
        {/* Blue diagonal light streaks */}
        <motion.div
          className="absolute w-[200%] h-32 bg-[var(--color-primary)]/10 blur-2xl -rotate-45"
          initial={{ top: '-50%', left: '-50%' }}
          animate={{ top: '150%', left: '150%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[200%] h-16 bg-white/5 blur-xl -rotate-45"
          initial={{ top: '-30%', left: '-50%' }}
          animate={{ top: '170%', left: '150%' }}
          transition={{ duration: 2.5, delay: 0.5, ease: 'easeInOut' }}
        />

        {/* Logo drops from top with spring + glow pulse */}
        <motion.div className="relative mb-[6vh]">
          <motion.img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="RRON Logo"
            className="w-[60vmin] object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)] filter brightness-0 invert"
            initial={{ y: -100, scale: 0.5, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-[var(--color-primary)] blur-[60px] -z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.4, 0.1], scale: [0.5, 1.2, 1] }}
            transition={{ duration: 2, delay: 0.5, times: [0, 0.2, 1] }}
          />
        </motion.div>

        {/* Typed out character by character */}
        <div className="mt-[2vh] flex flex-wrap justify-center gap-x-[1.5vmin] perspective-[1000px]">
          {title.split('').map((char, i) => (
            <motion.span
              key={i}
              className="text-[6vmin] tracking-[0.2em] font-body font-light text-white/90"
              variants={charVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 + i * 0.05 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Wipe in via clip-path at bottom */}
        <motion.div
          className="mt-[4vh] relative"
          initial={{ clipPath: 'inset(0 50% 0 50%)' }}
          animate={{ clipPath: 'inset(0 0% 0 0%)' }}
          transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-[2vmin]">
            <span className="w-[8vmin] h-[2px] bg-[var(--color-primary)] inline-block" />
            <p className="font-body text-[3vmin] text-[var(--color-primary)] tracking-[0.3em] whitespace-nowrap">
              FERIZAJ · PRISHTINË · KOSOVO
            </p>
            <span className="w-[8vmin] h-[2px] bg-[var(--color-primary)] inline-block" />
          </div>
        </motion.div>
        
      </div>
    </motion.div>
  );
}
