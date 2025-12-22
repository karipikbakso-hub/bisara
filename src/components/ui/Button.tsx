"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "lg";
  href?: string;
  className?: string;
  showArrow?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  href,
  className = "",
  showArrow = false
}: ButtonProps) {
  const baseClasses = "group relative font-semibold shadow-lg transition-all duration-300 inline-flex items-center gap-2 focus-ring overflow-hidden";

  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-xl hover:shadow-primary-500/40 rounded-xl",
    secondary: "bg-white text-primary-600 border border-primary-300 hover:bg-primary-50 rounded-xl"
  };

  const sizes = {
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        )}
      </span>

      {variant === "primary" && (
        <>
          {/* Shine effect on hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        </>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={buttonClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
