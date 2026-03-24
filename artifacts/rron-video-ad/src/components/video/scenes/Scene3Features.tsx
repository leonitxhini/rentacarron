import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

const features = [
  { title: "AIRPORT PICKUP", icon: "✈️" },
  { title: "INSURANCE INCLUDED", icon: "🛡️" },
  { title: "24/7 SUPPORT", icon: "📞" }
];

export function Scene3Features() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      {...sceneTransitions.splitHorizontal}
    >
      {/* Background with video loop */}
      <div className="absolute inset-0 w-full h-full opacity-30 mix-blend-screen">
        <video 
          src={`${import.meta.env.BASE_URL}video-bg.mp4`}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050a15] via-[#050a15]/80 to-[#050a15]" />
      </div>

      <div className="relative z-20 w-full px-[10vw]">
        <motion.h2 
          className="font-display text-[6vw] text-white text-center mb-[10vh]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          UNCOMPROMISING <span className="text-[var(--color-primary)]">SERVICE</span>
        </motion.h2>

        <div className="flex justify-between items-center gap-[4vw]">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex-1 aspect-square bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 backdrop-blur-md relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.2, type: 'spring', bounce: 0.4 }}
            >
              {/* Subtle hover-like glow that pulses */}
              <motion.div
                className="absolute inset-0 bg-[var(--color-primary)] opacity-20 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i }}
              />
              
              <div className="text-[5vw] mb-6">{feature.icon}</div>
              <h3 className="font-display text-[2.5vw] text-white text-center leading-tight">
                {feature.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
