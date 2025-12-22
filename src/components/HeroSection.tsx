"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{backgroundColor: '#020617'}}>
      {/* Gradient Orbs - BLUE THEME */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 text-primary-200 text-sm font-medium rounded-full">
            <Sparkles className="w-4 h-4" />
            Sistem Kerja untuk UMKM Indonesia
          </span>

          {/* Headline */}
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Sistem Kerja Digital untuk Usaha Indonesia yang Ingin{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">
              Rapi Tanpa Ribet
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-3xl mx-auto">
            Bukan aplikasi besar. Bukan website biasa. Ini alat bantu operasional yang simpel, sesuai cara kerja Anda.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary Button - COPY EXACTLY */}
            <motion.a
              href="https://wa.me/6281234567890"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Chat via WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </motion.a>

            {/* Secondary Button */}
            <motion.button
              onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border-2 border-primary-500/20 text-primary-300 rounded-xl font-semibold hover:bg-primary-500/10 hover:border-primary-500/40 transition-all duration-300"
            >
              Lihat Produk Kami
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
