import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const REAL_CARS = [
  { name: 'Audi A6', year: 2021, price: 75, img: 'https://rentacarron.replit.app/images/cars/audi-a6-2021-black-front.png' },
  { name: 'Audi A5', year: 2021, price: 70, img: 'https://rentacarron.replit.app/images/cars/audi-a5-2021-darkblue-front.png' },
  { name: 'Volkswagen Golf 8', year: 2021, price: 50, img: 'https://rentacarron.replit.app/images/cars/golf8-2021-black-front.png' },
  { name: 'Audi A3', year: 2018, price: 40, img: 'https://rentacarron.replit.app/images/cars/audi-a3-2018-lightgrey-front.png' },
  { name: 'Volkswagen Golf 7', year: 2018, price: 35, img: 'https://rentacarron.replit.app/images/cars/golf7-2018-black-front.png' },
  { name: 'Peugeot 308', year: 2020, price: 35, img: 'https://rentacarron.replit.app/images/cars/peugeot-308-2020-grey-front.png' },
];

export function Scene2Fleet() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % REAL_CARS.length), 1166);
    return () => clearInterval(t);
  }, []);

  const car = REAL_CARS[active];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col z-10 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Progress dots */}
      <div className="absolute top-[4vh] left-0 w-full flex justify-center gap-[2vmin] z-30">
        {REAL_CARS.map((_, i) => (
          <div
            key={i}
            className="w-[6vmin] h-[3px] rounded-full transition-all duration-300"
            style={{ background: i === active ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)' }}
          />
        ))}
      </div>

      {/* Car image — upper 60% */}
      <div className="absolute top-0 left-0 w-full h-[60%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050a15] z-10" />
        {REAL_CARS.map((c, i) => (
          <motion.div
            key={c.img}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={c.img}
              alt={c.name}
              className="w-full h-full object-contain translate-y-[8%]"
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-[10vh] left-0 w-full px-[8vw] z-30 flex flex-col gap-[2vh]">
        <p className="font-body text-[3.5vmin] text-[var(--color-primary)] tracking-[0.3em] font-medium">
          FLEET
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={car.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <h2 className="font-display text-[13vmin] text-white leading-none">
              {car.name.toUpperCase()}
            </h2>
            <div className="flex items-center gap-[4vw] mt-[2vh]">
              <span className="font-body text-white/50 text-[4vmin]">{car.year}</span>
              <span className="font-display text-[var(--color-primary)] text-[9vmin] leading-none">
                €{car.price}
                <span className="text-white/40 text-[4vmin] font-body ml-1">/day</span>
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
