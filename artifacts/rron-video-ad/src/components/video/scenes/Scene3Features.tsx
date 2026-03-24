import { motion } from 'framer-motion';
import { sceneTransitions, charVariants } from '@/lib/video/animations';

const features = [
  { title: "AIRPORT PICKUP", icon: "✈️", desc: "Direct at the terminal" },
  { title: "FULL INSURANCE", icon: "🛡️", desc: "No hidden costs" },
  { title: "24/7 SUPPORT", icon: "📞", desc: "Always available" }
];

export function Scene3Features() {
  const title = "OUR SERVICES";
  
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-transparent"
      {...sceneTransitions.slideLeft}
    >
      {/* Animated blue grid lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <motion.div 
          className="w-full h-[200%] absolute top-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.3) 1px, transparent 1px)`,
            backgroundSize: '10vmin 10vmin'
          }}
          animate={{ y: [0, '-10vmin'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a15] via-transparent to-[#050a15]" />
      </div>

      <div className="relative z-20 w-full px-[8vw] flex flex-col h-full py-[12vh]">
        <div className="flex flex-wrap justify-center gap-x-[1.5vmin] mb-[8vh] mt-[4vh] perspective-[1000px]">
          {title.split('').map((char, i) => (
            <motion.span
              key={i}
              className="font-display text-[14vmin] text-white tracking-wider"
              variants={charVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        <div className="flex flex-col gap-[3vh] flex-1 justify-center">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="relative flex items-center gap-[5vw] bg-[#0f172a]/80 border border-[var(--color-primary)]/30 rounded-[4vmin] p-[5vmin] backdrop-blur-xl"
              initial={{ opacity: 0, x: -50, rotateX: 45 }}
              animate={{ opacity: 1, x: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + i * 0.2, type: 'spring', bounce: 0.4 }}
              style={{ transformPerspective: 1000 }}
            >
              {/* Pulsing border glow */}
              <motion.div
                className="absolute inset-0 rounded-[4vmin] border-[2px] border-[var(--color-primary)]"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0.6, 0], scale: [1, 1.03, 1.08] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
              />
              
              <div className="w-[18vmin] h-[18vmin] rounded-[3vmin] bg-[var(--color-primary)]/20 flex items-center justify-center text-[8vmin] shrink-0 border border-[var(--color-primary)]/40 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-[var(--color-primary)] opacity-30"
                  animate={{ y: ['100%', '-100%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                />
                <span className="relative z-10">{feature.icon}</span>
              </div>
              
              <div className="flex-1">
                <h3 className="font-display text-[7vmin] text-white leading-none mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-[4vmin] text-white/50">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
