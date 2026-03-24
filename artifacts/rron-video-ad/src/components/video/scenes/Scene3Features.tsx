import { motion } from 'framer-motion';

const features = [
  { title: "AIRPORT PICKUP", icon: "✈️", desc: "Direct at the terminal" },
  { title: "FULL INSURANCE", icon: "🛡️", desc: "No hidden costs" },
  { title: "24/7 SUPPORT", icon: "📞", desc: "Always available" }
];

export function Scene3Features() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full px-[7vw] flex flex-col gap-[3vh]">
        <motion.h2
          className="font-display text-[10vmin] text-white tracking-wide text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          OUR SERVICES
        </motion.h2>

        <div className="flex flex-col gap-[2vh]">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-[4vw] bg-white/5 border border-white/10 rounded-[3vmin] p-[4vmin]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
            >
              <div className="w-[13vmin] h-[13vmin] rounded-[2.5vmin] bg-[var(--color-primary)]/15 flex items-center justify-center text-[6vmin] shrink-0">
                {feature.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-[5.5vmin] text-white leading-tight">
                  {feature.title}
                </h3>
                <p className="font-body text-[3vmin] text-white/50 mt-[0.5vmin]">
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
