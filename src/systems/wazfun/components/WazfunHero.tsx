'use client';

import { motion } from 'framer-motion';

export function WazfunHero() {
  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#111827' }} // slate-900 industrial
    >
      {/* Subtle Industrial Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ backgroundColor: 'rgba(18, 207, 203, 0.12)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Brand Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center justify-center mb-10"
        >
          <div className="px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
            <span className="text-[#12cfcb] font-black tracking-widest text-sm">
              WAZFUN LAUNDRY
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl md:text-6xl font-black text-white leading-tight mb-6"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Smart Laundry.
          <br />
          <span className="text-[#12cfcb]">Real-Time Monitoring.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Pantau mesin cuci dan dryer secara langsung.
          <br />
          Status jelas. Waktu akurat. Operasional lebih efisien.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center"
        >
          <a
            href="#dashboard"
            className="px-10 py-4 rounded-xl font-bold text-lg
              bg-[#12cfcb] text-slate-900
              shadow-lg shadow-[#12cfcb]/30
              hover:shadow-xl hover:shadow-[#12cfcb]/40
              transition-all duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Lihat Status Mesin
          </a>
        </motion.div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
