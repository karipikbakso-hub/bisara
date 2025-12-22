"use client";

import { motion } from "framer-motion";
import { Target, Zap, MapPin } from "lucide-react";

const principles = [
  {
    icon: Target,
    title: "Satu Fungsi, Jelas Manfaatnya",
    description: "Bukan aplikasi dengan 100 fitur yang bingung. Tiap sistem punya 1 tujuan jelas."
  },
  {
    icon: Zap,
    title: "Tanpa Mengubah Cara Kerja",
    description: "Gak perlu training ribet. Gak perlu login berkali-kali. Langsung pakai, langsung paham."
  },
  {
    icon: MapPin,
    title: "Lokal & Kontekstual",
    description: "Didesain dari kebiasaan UMKM Indonesia. Bisa dijual via WA, tanpa presentasi panjang."
  }
];

export function SolutionSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32" style={{backgroundColor: '#020617'}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Bisara Sistem: Alat Bantu Biar Usaha Jalan Lebih Rapi
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto">
            Sistem kerja yang simpel, sesuai cara kerja Anda. Tidak mengubah rutinitas, tapi membuat semuanya lebih tertata.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-primary-400/50 via-primary-500/30 to-primary-600/50 hover:from-primary-400 hover:via-primary-500 hover:to-primary-600 transition-all duration-300"
            >
              <div className="relative bg-slate-900 rounded-2xl p-8 h-full">
                <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <principle.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-heading text-2xl font-semibold text-white mb-3">
                  {principle.title}
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
