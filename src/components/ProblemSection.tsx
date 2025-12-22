"use client";

import { motion } from "framer-motion";
import { MessageCircle, FileX, AlertCircle, TrendingUp } from "lucide-react";

const painPoints = [
  {
    icon: MessageCircle,
    title: "Semua tanya ke pemilik",
    description: "Status mesin kosong gak? Kamar ada gak? Setiap hari ada yang nanya terus."
  },
  {
    icon: FileX,
    title: "Kerja manual gak tercatat",
    description: "Lupa siapa yang udah bayar, siapa yang belum. Semua masih pakai buku catatan."
  },
  {
    icon: AlertCircle,
    title: "Status usaha gak jelas",
    description: "Pelanggan bingung, pegawai sering nanya. Sulit tahu kondisi usaha saat ini."
  },
  {
    icon: TrendingUp,
    title: "Pengin naik kelas",
    description: "Tapi aplikasi ribet, website gak kepake. Pengin yang simpel tapi profesional."
  }
];

export function ProblemSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32" style={{backgroundColor: '#0f172a'}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Usaha Jalan, Tapi Kok Berantakan?
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto">
            Operasional berjalan, tapi masih banyak yang manual dan tidak efisien.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl border border-neutral-700 hover:border-primary-300 bg-slate-800 hover:shadow-card transition-all duration-300"
            >
              {/* Icon dengan gradient background - MANDATORY */}
              <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <point.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                {point.title}
              </h3>
              <p className="text-neutral-300">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
