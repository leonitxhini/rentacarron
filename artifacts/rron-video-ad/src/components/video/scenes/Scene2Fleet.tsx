import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene2Fleet() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      {...sceneTransitions.clipPolygon}
    >
      {/* Background Image inside scene to zoom with scene */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: 'linear' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}fleet-hero.png`}
          alt="Luxury Car"
          className="w-full h-full object-cover opacity-80"
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)] via-transparent to-[var(--color-bg-dark)] opacity-90" />
      </motion.div>

      <div className="absolute left-[10vw] bottom-[20vh] flex flex-col items-start z-20">
        <motion.div
          className="overflow-hidden mb-4"
        >
          <motion.div
            className="text-[var(--color-secondary)] font-body font-bold tracking-[0.2em] text-[1.5vw] uppercase mb-2 flex items-center gap-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="w-12 h-[2px] bg-[var(--color-secondary)] inline-block" />
            The Fleet
          </motion.div>
        </motion.div>

        <motion.h1
          className="font-display text-[8vw] leading-none text-white drop-shadow-2xl"
          initial={{ y: 50, opacity: 0, rotateX: 30 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'bottom' }}
        >
          14 PREMIUM
          <br />
          VEHICLES
        </motion.h1>

        <motion.p
          className="font-body text-[2vw] text-white/70 mt-6 font-light max-w-2xl"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
        >
          Audi A5 • BMW 3-Series • Mercedes C-Class • VW Golf
        </motion.p>
      </div>
    </motion.div>
  );
}
