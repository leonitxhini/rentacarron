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
      {/* PERSISTENT BACKGROUND — blue orb only, no gold */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute w-[60vw] h-[60vw] rounded-full bg-[var(--color-primary)] blur-[180px]"
          animate={{
            x: currentScene === 0 ? '-20vw' : currentScene === 2 ? '40vw' : currentScene === 4 ? '10vw' : '-10vw',
            y: currentScene === 0 ? '-10vh' : currentScene === 3 ? '40vh' : currentScene === 5 ? '60vh' : '10vh',
            scale: currentScene % 2 === 0 ? 1 : 1.2,
            opacity: currentScene === 4 ? 0.02 : 0.04,
          }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        />
      </div>

      {/* CROSS-SCENE CONTINUITY: Blue accent line */}
      <motion.div
        className="absolute z-30 bg-[var(--color-primary)] shadow-[0_0_10px_rgba(59,130,246,0.7)]"
        animate={{
          width: currentScene === 0 ? '0vw' : currentScene === 1 ? '3px' : currentScene === 3 ? '3px' : currentScene === 5 ? '40vw' : '2px',
          height: currentScene === 1 || currentScene === 3 ? '100vh' : '2px',
          left: currentScene === 1 ? '5vw' : currentScene === 3 ? '93vw' : '30vw',
          top: currentScene === 1 || currentScene === 3 ? '0' : currentScene === 5 ? '65vh' : '10vh',
          opacity: currentScene === 2 || currentScene === 4 ? 0 : 0.7,
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
