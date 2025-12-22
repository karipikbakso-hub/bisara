'use client';

import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';

export function WazfunHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-32 h-32 bg-yellow-400/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-green-400/15 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 right-20 w-24 h-24 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <Sparkles className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">WAZFUN</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Bikin Tiktok Di WAZFUN,
            <br />
            <span className="text-yellow-400">Bisa Dapetin Hadiah Ini!</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Cuci sambil nongkrong? Bisa banget! Ambil foto, bikin story, dapetin voucher cuci gratis! 🎉
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Play className="w-5 h-5" />
              Mulai Sekarang - Gratis!
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Lihat Cara Main
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            ></motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
