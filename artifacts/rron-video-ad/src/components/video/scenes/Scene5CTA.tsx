import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene5CTA() {
  const cta = "JETZT BUCHEN";
  const number = "+383 48 188 415";

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-transparent"
      {...sceneTransitions.wipe}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Green glow pulse from bottom radiating upward */}
        <motion.div 
          className="absolute -bottom-[30vh] left-1/2 -translate-x-1/2 w-[150vw] h-[80vh] bg-[#25D366] opacity-20 rounded-[100%] blur-[80px]"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.1, 0.3, 0.1],
            y: [0, -50, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#050a15]/50 to-[#050a15]" />
      </div>

      <div className="relative z-20 flex flex-col items-center w-full px-[8vw]">
        
        {/* Massive kinetic typography */}
        <div className="flex flex-wrap justify-center gap-x-[2vmin] mb-[8vh] perspective-[1000px]">
          {cta.split('').map((char, i) => (
            <motion.span
              key={i}
              className="font-display text-[16vmin] leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              variants={{
                hidden: { opacity: 0, y: 100, rotateX: 90, scale: 0.5 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0, 
                  scale: 1,
                  transition: { type: 'spring', stiffness: 200, damping: 15 }
                }
              }}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="flex flex-col items-center justify-center gap-[5vh] bg-[#0f172a]/60 border border-white/10 p-[10vmin] rounded-[6vmin] backdrop-blur-xl shadow-[0_0_50px_rgba(37,211,102,0.15)] w-full max-w-sm relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
        >
          {/* Animated border line for the card */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#25D366] to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* WhatsApp icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 1 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-[#25D366] rounded-full blur-2xl opacity-50"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg viewBox="0 0 24 24" className="w-[24vmin] h-[24vmin] text-[#25D366] fill-current relative z-10 drop-shadow-[0_0_20px_rgba(37,211,102,0.6)]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.div>
          </motion.div>
          
          <div className="flex text-white font-display text-[11vmin] tracking-wider overflow-hidden">
            {number.split('').map((digit, i) => (
              <motion.span
                key={i}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.5 + i * 0.05, type: 'spring' }}
              >
                {digit === ' ' ? '\u00A0' : digit}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        {/* Typed in below */}
        <div className="mt-[8vh] flex">
          {"24/7 VERFÜGBAR".split('').map((char, i) => (
            <motion.span
              key={i}
              className="font-body text-[5vmin] text-[#25D366] tracking-[0.3em] font-semibold drop-shadow-[0_0_10px_rgba(37,211,102,0.3)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 2.2 + i * 0.05 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
