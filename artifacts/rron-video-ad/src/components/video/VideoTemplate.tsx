import { AnimatePresence, motion } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { useEffect, useState } from 'react';
import {
  Scene1Reveal,
  Scene2Fleet,
  Scene3Features,
  Scene4Location,
  Scene5CTA,
  Scene6Outro,
} from './scenes';

const SCENE_DURATIONS = {
  reveal: 4000,
  fleet: 7000,
  features: 5000,
  location: 4000,
  cta: 5000,
  outro: 4000,
};

// Particle Field component
function ParticleField() {
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, speed: number, delay: number }>>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20, // Start below screen
      size: Math.random() * 4 + 1,
      speed: Math.random() * 10 + 15, // seconds to cross screen
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: Math.random() * 0.3 + 0.1,
            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.8)`,
          }}
          animate={{
            y: ['120vh', '-20vh'],
            x: [`${p.x}%`, `${p.x + (Math.random() * 10 - 5)}%`]
          }}
          transition={{
            duration: p.speed,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
    loop: true,
  });

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      <div
        className="relative overflow-hidden bg-[#050a15]"
        style={{ aspectRatio: '9/16', height: '100%', maxWidth: 'calc(100vh * 9 / 16)' }}
      >
        {/* PERSISTENT BACKGROUND — Slowly rotating radial gradient */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square rounded-full blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(5,10,21,0) 70%)'
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
              scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
          <motion.div
            className="absolute w-[80vw] h-[80vw] rounded-full bg-[var(--color-primary)] blur-[120px]"
            animate={{
              x: currentScene === 0 ? '-30vw' : currentScene === 2 ? '50vw' : currentScene === 4 ? '10vw' : '-20vw',
              y: currentScene === 0 ? '-10vh' : currentScene === 3 ? '60vh' : currentScene === 5 ? '80vh' : '20vh',
              scale: currentScene % 2 === 0 ? 1 : 1.3,
              opacity: currentScene === 4 ? 0.05 : 0.1,
            }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
        </div>
        
        <ParticleField />

        {/* CROSS-SCENE CONTINUITY: Blue accent line redesigned for portrait */}
        <motion.div
          className="absolute z-30 bg-[var(--color-primary)] shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          animate={{
            width: currentScene === 0 ? '0vw' : currentScene === 1 ? '4px' : currentScene === 3 ? '4px' : currentScene === 5 ? '60vw' : '2px',
            height: currentScene === 1 || currentScene === 3 ? '100vh' : '2px',
            left: currentScene === 1 ? '4vw' : currentScene === 3 ? '96vw' : '20vw',
            top: currentScene === 1 || currentScene === 3 ? '0' : currentScene === 5 ? '75vh' : '15vh',
            opacity: currentScene === 2 || currentScene === 4 ? 0 : 0.8,
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        <AnimatePresence mode="wait">
          {currentScene === 0 && <Scene1Reveal key="reveal" />}
          {currentScene === 1 && <Scene2Fleet key="fleet" />}
          {currentScene === 2 && <Scene3Features key="features" />}
          {currentScene === 3 && <Scene4Location key="location" />}
          {currentScene === 4 && <Scene5CTA key="cta" />}
          {currentScene === 5 && <Scene6Outro key="outro" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
