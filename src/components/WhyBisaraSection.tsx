"use client";

import { motion } from "framer-motion";
import { Layout, ShieldOff, MessageCircle, MapPin } from "lucide-react";

const differentiators = [
  {
    icon: Layout,
    title: "Sistem Kerja, Bukan Website",
    description: "Fokus ke operasional, bukan tampilan. Membantu kerja jadi lebih efisien."
  },
  {
    icon: ShieldOff,
    title: "Tanpa Login Ribet",
    description: "Pelanggan langsung pakai, tanpa daftar akun. Cukup akses link dan langsung jalan."
  },
  {
    icon: MessageCircle,
    title: "Bisa Dijual via WhatsApp",
    description: "Deploy cepat, closing via WA, gak pakai presentasi panjang. Cocok untuk UMKM."
  },
  {
    icon: MapPin,
    title: "Lokal & Realistis",
    description: "Didesain dari kebiasaan UMKM Indonesia. Tidak mengada-ada, sesuai realita."
  }
];

export function WhyBisaraSection() {
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
            Kenapa Pilih Bisara Sistem?
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto">
            Berbeda dari solusi digital lainnya yang generic dan ribet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-heading font-bold text-white mb-4">
                {item.title}
              </h3>

              <p className="text-neutral-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
