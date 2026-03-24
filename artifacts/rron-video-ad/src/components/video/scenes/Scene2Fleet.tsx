import { motion } from 'framer-motion';
import { sceneTransitions, charVariants } from '@/lib/video/animations';
import { useState, useEffect } from 'react';

const REAL_CARS = [
  { name: 'Audi A6', year: 2021, price: 75, img: 'https://rentacarron.replit.app/images/cars/audi-a6-2021-black-front.png' },
  { name: 'Audi A5', year: 2021, price: 70, img: 'https://rentacarron.replit.app/images/cars/audi-a5-2021-darkblue-front.png' },
  { name: 'Volkswagen Golf 8', year: 2021, price: 50, img: 'https://rentacarron.replit.app/images/cars/golf8-2021-black-front.png' },
  { name: 'Audi A3', year: 2018, price: 40, img: 'https://rentacarron.replit.app/images/cars/audi-a3-2018-lightgrey-front.png' },
  { name: 'Volkswagen Golf 7', year: 2018, price: 35, img: 'https://rentacarron.replit.app/images/cars/golf7-2018-black-front.png' },
  { name: 'Peugeot 308', year: 2020, price: 35, img: 'https://rentacarron.replit.app/images/cars/peugeot-308-2020-grey-front.png' },
];

function Counter({ to, duration = 1 }: { to: number, duration?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = to;
    const startTime = performance.now();
    let animationFrameId: number;
    
    const updateCount = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(ease * end));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [to, duration]);
  
  return <>{count}</>;
}

export function Scene2Fleet() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % REAL_CARS.length), 1166); // ~7s total / 6 cars
    return () => clearInterval(t);
  }, []);

  const car = REAL_CARS[active];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-transparent"
      {...sceneTransitions.slideUp}
    >
      {/* Top Progress Bar */}
      <div className="absolute top-[4vh] left-0 w-full flex justify-center gap-1 z-30 px-6">
        {REAL_CARS.map((_, i) => (
          <div key={i} className="h-[3px] flex-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--color-primary)] origin-left"
              initial={{ scaleX: i < active ? 1 : 0 }}
              animate={{ scaleX: i < active ? 1 : i === active ? 1 : 0 }}
              transition={{ duration: i === active ? 1.166 : 0, ease: 'linear' }}
            />
          </div>
        ))}
      </div>

      <div className="absolute top-[8vh] left-[6vw] z-30 font-body text-[3.5vmin] text-white/50 tracking-widest font-medium">
        {active + 1} / 6
      </div>

      <motion.div
        className="absolute top-[8vh] right-[6vw] z-30 flex flex-col items-end"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="font-display text-[10vmin] text-[var(--color-primary)] leading-none"><Counter to={14} duration={1.5} /></div>
        <div className="font-body text-white/40 text-[2.5vmin] tracking-[0.2em] -mt-1">VEHICLES</div>
      </motion.div>

      {/* Car image filling upper 60% */}
      <div className="absolute top-0 left-0 w-full h-[65%] overflow-hidden z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050a15] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#050a15]/80 z-10" />
        
        {REAL_CARS.map((c, i) => (
          <motion.div
            key={c.img}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ 
              opacity: i === active ? 1 : 0, 
              scale: i === active ? 1 : 1.1,
              zIndex: i === active ? 10 : 0
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img
              src={c.img}
              alt={c.name}
              className="w-[130%] h-[130%] object-contain object-center drop-shadow-2xl translate-y-[10%]"
              style={{ filter: 'brightness(1.1) contrast(1.1)' }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom content area */}
      <div className="absolute bottom-[10vh] left-0 w-full px-[8vw] z-30 flex flex-col">
        <motion.div
          className="text-[var(--color-primary)] font-body font-bold tracking-[0.3em] text-[3.5vmin] uppercase mb-[2vh] flex items-center gap-[2vw]"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-[8vw] h-[2px] bg-[var(--color-primary)] inline-block" />
          FLEET
        </motion.div>

        <div className="h-[12vh] perspective-[1000px] flex items-end overflow-hidden pb-2 w-full">
          {REAL_CARS.map((c, i) => i === active && (
            <div key={c.name} className="flex flex-wrap gap-x-[1.5vmin] w-full">
              {c.name.toUpperCase().split('').map((char, charIdx) => (
                <motion.span
                  key={`${c.name}-${charIdx}`}
                  className="font-display text-[14vmin] leading-none text-white drop-shadow-lg"
                  variants={charVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: charIdx * 0.03 }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
          ))}
        </div>

        <div className="h-[10vh] mt-[2vh]">
          {REAL_CARS.map((c, i) => i === active && (
            <motion.div
              key={`${c.year}-${c.price}`}
              className="flex items-center gap-[4vw] bg-[#0f172a]/60 border border-[var(--color-primary)]/30 rounded-[3vmin] px-[6vw] py-[2vh] backdrop-blur-md w-fit shadow-[0_0_20px_rgba(59,130,246,0.15)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="font-body text-white/60 text-[4.5vmin] font-medium">{c.year}</span>
              <span className="w-[1.5vmin] h-[1.5vmin] rounded-full bg-[var(--color-primary)] inline-block" />
              <span className="font-display text-[var(--color-primary)] text-[9vmin] leading-none">
                €<Counter to={c.price} duration={0.6} />
                <span className="text-white/40 text-[4vmin] font-body ml-2">/Tag</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
