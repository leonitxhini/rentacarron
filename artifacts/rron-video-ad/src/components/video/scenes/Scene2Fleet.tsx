import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';
import { useState, useEffect } from 'react';

const REAL_CARS = [
  {
    name: 'Audi A6',
    year: 2021,
    price: '€75',
    img: 'https://rentacarron.replit.app/images/cars/audi-a6-2021-black-front.png',
  },
  {
    name: 'Audi A5',
    year: 2021,
    price: '€70',
    img: 'https://rentacarron.replit.app/images/cars/audi-a5-2021-darkblue-front.png',
  },
  {
    name: 'Volkswagen Golf 8',
    year: 2021,
    price: '€50',
    img: 'https://rentacarron.replit.app/images/cars/golf8-2021-black-front.png',
  },
  {
    name: 'Audi A3',
    year: 2018,
    price: '€40',
    img: 'https://rentacarron.replit.app/images/cars/audi-a3-2018-lightgrey-front.png',
  },
  {
    name: 'Volkswagen Golf 7',
    year: 2018,
    price: '€35',
    img: 'https://rentacarron.replit.app/images/cars/golf7-2018-black-front.png',
  },
  {
    name: 'Peugeot 308',
    year: 2020,
    price: '€35',
    img: 'https://rentacarron.replit.app/images/cars/peugeot-308-2020-grey-front.png',
  },
];

export function Scene2Fleet() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % REAL_CARS.length), 1400);
    return () => clearInterval(t);
  }, []);

  const car = REAL_CARS[active];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      {...sceneTransitions.clipPolygon}
    >
      {/* Full-bleed car image */}
      <motion.div className="absolute inset-0 w-full h-full">
        {REAL_CARS.map((c, i) => (
          <motion.img
            key={c.img}
            src={c.img}
            alt={c.name}
            className="absolute inset-0 w-full h-full object-contain"
            animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.04 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{ filter: 'brightness(0.9)' }}
          />
        ))}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050a15] via-transparent to-[#050a15]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-transparent to-[#050a15]/60" />
      </motion.div>

      {/* Left content */}
      <div className="absolute left-[6vw] bottom-[18vh] flex flex-col items-start z-20">
        <motion.div
          className="text-[var(--color-primary)] font-body font-bold tracking-[0.25em] text-[1.2vw] uppercase mb-3 flex items-center gap-3"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="w-10 h-[2px] bg-[var(--color-primary)] inline-block" />
          Unsere Flotte
        </motion.div>

        <motion.h1
          key={car.name}
          className="font-display text-[7vw] leading-none text-white drop-shadow-2xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {car.name.toUpperCase()}
        </motion.h1>

        <motion.div
          key={car.year + car.price}
          className="flex items-center gap-4 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="font-body text-white/50 text-[1.5vw]">{car.year}</span>
          <span className="w-1 h-1 rounded-full bg-white/30 inline-block" />
          <span className="font-display text-[var(--color-primary)] text-[2.5vw]">ab {car.price}<span className="text-white/40 text-[1.2vw] font-body">/Tag</span></span>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-6">
          {REAL_CARS.map((_, i) => (
            <div
              key={i}
              className="h-[3px] rounded-full transition-all duration-500"
              style={{
                width: i === active ? '2.5vw' : '0.8vw',
                background: i === active ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Top right stat */}
      <motion.div
        className="absolute top-[8vh] right-[6vw] text-right"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="font-display text-[6vw] text-white leading-none">14</div>
        <div className="font-body text-white/40 text-[1.2vw] tracking-[0.2em]">FAHRZEUGE</div>
      </motion.div>
    </motion.div>
  );
}
