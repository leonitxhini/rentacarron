import { motion } from 'framer-motion';

export function Scene1Reveal() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center justify-center gap-[5vmin] px-[10vmin]">
        <motion.img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="RRON Logo"
          className="w-[65vmin] object-contain filter brightness-0 invert"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.p
          className="font-body text-[4.5vmin] text-white/70 tracking-[0.25em] text-center font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          PREMIUM RENT A CAR
        </motion.p>

        <motion.div
          className="flex items-center gap-[3vmin]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <span className="w-[8vmin] h-[1px] bg-[var(--color-primary)] inline-block" />
          <p className="font-body text-[3vmin] text-[var(--color-primary)] tracking-[0.25em]">
            FERIZAJ · PRISHTINË · KOSOVO
          </p>
          <span className="w-[8vmin] h-[1px] bg-[var(--color-primary)] inline-block" />
        </motion.div>
      </div>
    </motion.div>
  );
}
