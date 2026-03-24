import { motion } from 'framer-motion';

export function Scene4Location() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src={`${import.meta.env.BASE_URL}location-bg.png`}
          alt="Kosovo Location"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-[#050a15]/60 to-[#050a15]" />
      </motion.div>

      <div className="relative z-20 flex flex-col items-center justify-center gap-[4vh] w-full px-[8vw]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <svg viewBox="0 0 24 24" className="w-[14vmin] h-[14vmin] fill-[var(--color-primary)]">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-[2vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="font-display text-[18vmin] text-white tracking-widest leading-none text-center">
            FERIZAJ
          </h2>
          <div className="w-[15vw] h-[2px] bg-[var(--color-primary)]" />
          <h2 className="font-display text-[18vmin] text-white tracking-widest leading-none text-center">
            PRISHTINË
          </h2>
        </motion.div>

        <motion.p
          className="font-body text-[5vmin] text-[var(--color-primary)] tracking-[0.4em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          KOSOVO
        </motion.p>
      </div>
    </motion.div>
  );
}
