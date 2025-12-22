"use client";

import { motion } from "framer-motion";

export function FinalCTASection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-400/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Siap Bikin Usaha Lebih Rapi?
          </h2>

          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Chat aja dulu, gratis konsultasi. Kami bantu analisis kebutuhan usaha Anda.
          </p>

          <motion.a
            href="https://wa.me/6281234567890"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
          >
            Chat via WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
