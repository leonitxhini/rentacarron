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
  fleet: 7000,
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
    <div className="w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      <div
        className="relative overflow-hidden bg-[#050a15]"
        style={{ aspectRatio: '9/16', height: '100%', maxWidth: 'calc(100vh * 9 / 16)' }}
      >
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
