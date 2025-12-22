'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MachineCardProps {
  id: number;
  status: 'available' | 'washing' | 'drying' | 'wash_dry' | 'finished';
  washTimeLeft?: number; // in minutes
  dryTimeLeft?: number; // in minutes
  totalWashTime?: number; // in minutes
  totalDryTime?: number; // in minutes
}

export function MachineCard({
  id,
  status,
  washTimeLeft = 0,
  dryTimeLeft = 0,
  totalWashTime = 40,
  totalDryTime = 50
}: MachineCardProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      let currentTimeLeft = 0;
      let totalTime = 0;

      if (status === 'washing') {
        currentTimeLeft = washTimeLeft;
        totalTime = totalWashTime;
      } else if (status === 'drying') {
        currentTimeLeft = dryTimeLeft;
        totalTime = totalDryTime;
      } else if (status === 'wash_dry') {
        currentTimeLeft = washTimeLeft + dryTimeLeft;
        totalTime = totalWashTime + totalDryTime;
      }

      setTimeLeft(currentTimeLeft);

      if (totalTime > 0) {
        const elapsed = totalTime - currentTimeLeft;
        setProgress(Math.min(100, (elapsed / totalTime) * 100));
      } else {
        setProgress(0);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [status, washTimeLeft, dryTimeLeft, totalWashTime, totalDryTime]);

  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'available':
        return {
          text: 'TERSEDIA',
          bg: 'bg-wazfun-mint',
          textColor: 'text-wazfun-navy',
          pulse: false
        };
      case 'washing':
      case 'drying':
      case 'wash_dry':
        return {
          text: 'SEDANG JALAN',
          bg: 'bg-wazfun-teal',
          textColor: 'text-white',
          pulse: false
        };
      case 'finished':
        return {
          text: 'SELESAI',
          bg: 'bg-wazfun-yellow',
          textColor: 'text-wazfun-navy',
          pulse: true
        };
      default:
        return {
          text: 'UNKNOWN',
          bg: 'bg-gray-200',
          textColor: 'text-gray-700',
          pulse: false
        };
    }
  };

  const badge = getStatusBadge();

  const getCardStyling = () => {
    switch (status) {
      case 'available':
        return {
          bg: 'bg-gradient-to-br from-white to-wazfun-teal/5',
          border: 'border-wazfun-teal/30',
          shadow: 'shadow-wazfun-teal/10',
          hoverShadow: 'hover:shadow-wazfun-teal/20'
        };
      case 'washing':
      case 'drying':
      case 'wash_dry':
        return {
          bg: 'bg-gradient-to-br from-white to-wazfun-teal/10',
          border: 'border-wazfun-teal',
          shadow: 'shadow-wazfun-teal/15',
          hoverShadow: 'hover:shadow-wazfun-teal/25'
        };
      case 'finished':
        return {
          bg: 'bg-gradient-to-br from-white to-wazfun-yellow/10',
          border: 'border-wazfun-yellow',
          shadow: 'shadow-wazfun-yellow/15',
          hoverShadow: 'hover:shadow-wazfun-yellow/25'
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-200',
          shadow: 'shadow-gray-100',
          hoverShadow: 'hover:shadow-gray-200'
        };
    }
  };

  const cardStyle = getCardStyling();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: id * 0.1 }}
      whileHover={{ scale: 1.03, y: -2 }}
      className={`
        ${cardStyle.bg} rounded-3xl p-8 shadow-xl transition-all duration-300
        border-2 ${cardStyle.border} ${cardStyle.hoverShadow}
        backdrop-blur-sm relative overflow-hidden
      `}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-wazfun-teal/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/50 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10">
        {/* Machine Icon */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={status === 'available' || status === 'finished' ? {} : { rotate: 360 }}
            transition={{
              duration: 2.5,
              repeat: status === 'available' || status === 'finished' ? 0 : Infinity,
              ease: "linear"
            }}
            className="relative"
          >
            {/* Outer Ring */}
            <div className="w-24 h-24 rounded-full border-4 border-wazfun-teal/20 flex items-center justify-center">
              {/* Inner Circle */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-wazfun-teal to-wazfun-teal-dark flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">🌀</span>
              </div>
            </div>
            {/* Glow Effect for Active Machines */}
            {(status === 'washing' || status === 'drying' || status === 'wash_dry') && (
              <div className="absolute inset-0 rounded-full bg-wazfun-teal/20 animate-pulse"></div>
            )}
          </motion.div>
        </div>

        {/* Machine Number */}
        <div className="text-center mb-6">
          <h3
            className="text-3xl font-black text-wazfun-navy mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Mesin #{id.toString().padStart(2, '0')}
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-wazfun-teal to-wazfun-teal-light rounded-full mx-auto"></div>
        </div>

        {/* Progress Bar */}
        {(status === 'washing' || status === 'drying' || status === 'wash_dry') && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-wazfun-navy" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Progress
              </span>
              <span className="text-lg font-black text-wazfun-teal" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-wazfun-teal to-wazfun-teal-light rounded-full shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Timer */}
        {(status === 'washing' || status === 'drying' || status === 'wash_dry') && (
          <div className="text-center mb-8">
            <div className="bg-wazfun-teal/10 rounded-2xl p-4 border border-wazfun-teal/20">
              <div
                className="text-5xl font-black text-wazfun-navy tabular-nums mb-1"
                style={{ fontFamily: 'monospace' }}
              >
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-wazfun-teal font-semibold uppercase tracking-wide">
                tersisa
              </div>
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <div className={`
            px-6 py-3 rounded-full font-black text-sm flex items-center gap-3 shadow-lg
            ${badge.bg} ${badge.textColor} border-2 border-white/50
            ${badge.pulse ? 'animate-pulse' : ''}
          `}
          style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <div className={`w-3 h-3 rounded-full bg-white shadow-sm`}></div>
            {badge.text}
            <div className={`w-3 h-3 rounded-full bg-white shadow-sm`}></div>
          </div>
        </div>

        {/* Status Messages */}
        <div className="text-center">
          {status === 'available' && (
            <div className="bg-wazfun-mint/20 rounded-xl p-4 border border-wazfun-mint/30">
              <p className="text-wazfun-navy font-bold text-lg">Siap digunakan! 🚀</p>
              <p className="text-wazfun-navy/70 text-sm mt-1">Pilih mesin dan mulai cuci</p>
            </div>
          )}

          {status === 'finished' && (
            <div className="bg-wazfun-yellow/20 rounded-xl p-4 border border-wazfun-yellow/30">
              <p className="text-wazfun-navy font-black text-xl">Yeay! Cucianmu udah selesai 🎉</p>
              <p className="text-wazfun-navy/70 text-sm mt-1">Ambil cucianmu sekarang</p>
            </div>
          )}

          {(status === 'washing' || status === 'drying' || status === 'wash_dry') && (
            <div className="bg-wazfun-teal/10 rounded-xl p-4 border border-wazfun-teal/20">
              <p className="text-wazfun-navy font-bold text-lg">Santai aja dulu! 😊</p>
              <p className="text-wazfun-teal text-sm mt-1 font-semibold">Cucian lagi diproses dengan sempurna</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
