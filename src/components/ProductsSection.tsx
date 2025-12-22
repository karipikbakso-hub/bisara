"use client";

import { motion } from "framer-motion";
import { WashingMachine, Calendar, Wrench, Sparkles, Clock } from "lucide-react";

const products = [
  {
    icon: WashingMachine,
    name: "Bisara Laundry",
    description: "Sistem status mesin laundry swalayan. Pelanggan cek sendiri, pegawai gak ribet.",
    badge: "available" as const,
    badgeText: "Produk Pertama",
    ctaText: "Lihat Detail"
  },
  {
    icon: Calendar,
    name: "Bisara Booking",
    description: "Sistem booking untuk salon, barbershop, atau layanan appointment.",
    badge: "coming-soon" as const,
    badgeText: "Segera Hadir",
    ctaText: "Segera Hadir"
  },
  {
    icon: Wrench,
    name: "Bisara Workshop",
    description: "Sistem tracking servis untuk bengkel atau workshop.",
    badge: "coming-soon" as const,
    badgeText: "Segera Hadir",
    ctaText: "Segera Hadir"
  }
];

export function ProductsSection() {
  return (
    <section id="produk" className="py-16 md:py-24 lg:py-32" style={{backgroundColor: '#020617'}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Produk Bisara Sistem
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto">
            Sistem kerja digital yang fokus pada satu fungsi utama. Simpel, efektif, dan langsung bermanfaat.
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {products.map((product, index) => (
            product.badge === "available" ? (
              // ACTIVE PRODUCT CARD
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="group relative"
              >
                {/* Gradient border container */}
                <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-primary-400/50 via-primary-500/30 to-primary-600/50 hover:from-primary-400 hover:via-primary-500 hover:to-primary-600 transition-all duration-300">
                  <div className="relative bg-slate-900 rounded-2xl p-8 h-full flex flex-col">
                    {/* Badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 self-start bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 text-primary-200 text-sm font-medium rounded-full">
                      <Sparkles className="w-3.5 h-3.5" />
                      {product.badgeText}
                    </span>

                    {/* Icon */}
                    <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-xl group-hover:shadow-primary-500/40 transition-all duration-300">
                      <product.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="font-heading text-2xl font-semibold text-white mb-3">
                      {product.name}
                    </h3>
                    <p className="text-neutral-300 mb-6 flex-grow">
                      {product.description}
                    </p>

                    {/* Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 overflow-hidden"
                    >
                      {product.ctaText}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              // COMING SOON PRODUCT CARD
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="group relative opacity-70"
              >
                <div className="relative p-[1px] rounded-2xl border-2 border-dashed border-neutral-600">
                  <div className="relative bg-slate-800 rounded-2xl p-8 h-full flex flex-col">
                    {/* Badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 self-start bg-neutral-700 border border-neutral-600 text-neutral-400 text-sm font-medium rounded-full">
                      <Clock className="w-3.5 h-3.5" />
                      {product.badgeText}
                    </span>

                    {/* Icon grayscale */}
                    <div className="w-16 h-16 mb-6 rounded-xl bg-neutral-700 flex items-center justify-center">
                      <product.icon className="w-8 h-8 text-neutral-500" />
                    </div>

                    {/* Content */}
                    <h3 className="font-heading text-2xl font-semibold text-neutral-200 mb-3">
                      {product.name}
                    </h3>
                    <p className="text-neutral-400 mb-6 flex-grow">
                      {product.description}
                    </p>

                    {/* Button disabled */}
                    <button
                      disabled
                      className="w-full px-6 py-3 bg-neutral-700 text-neutral-500 rounded-xl font-semibold cursor-not-allowed"
                    >
                      {product.ctaText}
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </motion.div>
      </div>
    </section>
  );
}
