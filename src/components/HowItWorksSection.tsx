"use client";

import { motion } from "framer-motion";
import { MessageCircle, Settings, Play } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Chat via WhatsApp",
    description: "Ceritain usaha kamu, kami kasih rekomendasi sistem yang pas."
  },
  {
    icon: Settings,
    title: "Pilih & Deploy",
    description: "Bayar sekali, langsung setup. Self-host atau pakai hosting kami."
  },
  {
    icon: Play,
    title: "Langsung Pakai",
    description: "Gak perlu training panjang. Sistem langsung jalan."
  }
];

export function HowItWorksSection() {
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
            Cara Kerja Simpel
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto">
            Dari konsultasi hingga beroperasi, semua proses cepat dan straightforward.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-6"
            >
              {/* Number badge */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-2xl font-bold text-white">{index + 1}</span>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
