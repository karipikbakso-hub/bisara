"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "coming-soon";
}

export function Card({ children, className = "", variant = "default" }: CardProps) {
  const baseClasses = "group relative p-[1px] rounded-2xl bg-gradient-to-br transition-all duration-300";

  const variants = {
    default: "from-primary-400/50 via-primary-500/30 to-primary-600/50 hover:from-primary-400 hover:via-primary-500 hover:to-primary-600",
    "coming-soon": "from-neutral-300/50 via-neutral-400/30 to-neutral-500/50 grayscale"
  };

  const cardClasses = `${baseClasses} ${variants[variant]}`;

  return (
    <motion.div
      className={cardClasses}
      whileHover={variant === "default" ? { scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative bg-white rounded-2xl p-8 h-full hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300 ${variant === "default" ? "hover:-translate-y-2" : ""} ${className}`}>
        {children}
      </div>
    </motion.div>
  );
}
