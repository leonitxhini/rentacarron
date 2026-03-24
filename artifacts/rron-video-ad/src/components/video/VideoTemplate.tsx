// Video Template
import { AnimatePresence, motion } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import {
  Scene1Reveal,
  Scene2Fleet,
  Scene3Features,
  Scene4Location,
  Scene5CTA,
  Scene6Outro,
} from './scenes';

// 6 scenes based on the requirements
const SCENE_DURATIONS = {
  reveal: 4000,
  fleet: 6000,
  features: 5000,
  location: 4000,
  cta: 5000,
  outro: 4000,
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
    loop: true,
  });

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
    >
      {/* PERSISTENT BACKGROUND LAYER */}
      {/* Animated gradient shifting subtly across all scenes */}
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen z-0">
        <motion.div
          className="absolute w-[100vw] h-[100vw] rounded-full bg-[var(--color-primary)] blur-[120px]"
          animate={{
            x: currentScene === 0 ? '-30vw' : currentScene === 2 ? '50vw' : currentScene === 4 ? '10vw' : '-20vw',
            y: currentScene === 0 ? '-20vh' : currentScene === 3 ? '50vh' : currentScene === 5 ? '80vh' : '20vh',
            scale: currentScene % 2 === 0 ? 1 : 1.5,
            opacity: currentScene === 4 ? 0.1 : 0.4, // Dim down for CTA which has green
          }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[80vw] h-[80vw] rounded-full bg-[var(--color-secondary)] blur-[100px]"
          animate={{
            x: currentScene === 0 ? '60vw' : currentScene === 1 ? '10vw' : currentScene === 5 ? '40vw' : '80vw',
            y: currentScene === 0 ? '60vh' : currentScene === 2 ? '-20vh' : currentScene === 4 ? '-40vh' : '80vh',
            scale: currentScene === 1 || currentScene === 5 ? 1.2 : 0.8,
            opacity: 0.2,
          }}
          transition={{ duration: 5, ease: 'easeInOut' }}
        />
      </div>

      {/* CROSS-SCENE CONTINUITY: Accent Line */}
      <motion.div
        className="absolute z-30 bg-[var(--color-secondary)] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
        animate={{
          width: currentScene === 0 ? '0vw' : currentScene === 1 ? '3vw' : currentScene === 3 ? '8vw' : currentScene === 5 ? '40vw' : '2vw',
          height: currentScene === 1 || currentScene === 3 ? '100vh' : '2px',
          left: currentScene === 1 ? '5vw' : currentScene === 3 ? '92vw' : '30vw',
          top: currentScene === 1 || currentScene === 3 ? '0' : currentScene === 5 ? '65vh' : '10vh',
          opacity: currentScene === 2 || currentScene === 4 ? 0 : 0.8, // Hide during features and CTA
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
  );
}
