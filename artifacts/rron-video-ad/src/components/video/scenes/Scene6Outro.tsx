import { motion } from 'framer-motion';

export function Scene6Outro() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center justify-center gap-[5vh] px-[8vw] w-full">
        <motion.img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="RRON Logo"
          className="w-[70vmin] object-contain filter brightness-0 invert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.div
          className="w-[60vw] h-[1px] bg-[var(--color-primary)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        <motion.h2
          className="font-display text-[8vmin] tracking-[0.2em] text-white/90 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          DRIVE WITH PRESTIGE
        </motion.h2>

        <motion.div
          className="flex flex-col items-center gap-[2vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <p className="font-display text-[8vmin] text-[var(--color-primary)] tracking-widest">
            +383 48 188 415
          </p>
          <p className="font-body text-[3.5vmin] text-white/40 tracking-[0.3em]">
            FERIZAJ · PRISHTINË
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
