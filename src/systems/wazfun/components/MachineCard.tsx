'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Machine, getMachineLabel, getMachineIcon, getMachineColor } from '../lib/constants';

interface MachineCardProps {
  machine: Machine;
}

export function MachineCard({ machine }: MachineCardProps) {
  const { id, type, status, endTime, duration } = machine;
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      if (status === 'running' && endTime) {
        const remaining = Math.max(0, endTime - Date.now());
        const remainingMinutes = remaining / 60000;
        setTimeLeft(remainingMinutes);

        const elapsed = duration - remainingMinutes;
        setProgress(Math.min(100, (elapsed / duration) * 100));
      } else {
        setTimeLeft(0);
        setProgress(0);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [status, endTime, duration]);

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
          bg: 'bg-green-100',
          textColor: 'text-green-800',
          pulse: false
        };
      case 'running':
        return {
          text: 'SEDANG JALAN',
          bg: type === 'washer' ? 'bg-blue-100' : 'bg-orange-100',
          textColor: type === 'washer' ? 'text-blue-800' : 'text-orange-800',
          pulse: false
        };
      case 'finished':
        return {
          text: 'SELESAI',
          bg: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          pulse: true
        };
      default:
        return {
          text: 'UNKNOWN',
          bg: 'bg-gray-100',
          textColor: 'text-gray-700',
          pulse: false
        };
    }
  };

  const badge = getStatusBadge();

  const getCardStyling = () => {
    const color = getMachineColor(type);
    switch (status) {
      case 'available':
        return {
          bg: type === 'washer'
            ? 'bg-gradient-to-br from-white to-blue-50/30'
            : 'bg-gradient-to-br from-white to-orange-50/30',
          border: type === 'washer'
            ? 'border-blue-200/50'
            : 'border-orange-200/50',
          shadow: type === 'washer'
            ? 'shadow-blue-100/50'
            : 'shadow-orange-100/50',
          hoverShadow: type === 'washer'
            ? 'hover:shadow-blue-200/70'
            : 'hover:shadow-orange-200/70'
        };
      case 'running':
        return {
          bg: type === 'washer'
            ? 'bg-gradient-to-br from-white to-blue-50/40'
            : 'bg-gradient-to-br from-white to-orange-50/40',
          border: type === 'washer'
            ? 'border-blue-300'
            : 'border-orange-300',
          shadow: type === 'washer'
            ? 'shadow-blue-200/50'
            : 'shadow-orange-200/50',
          hoverShadow: type === 'washer'
            ? 'hover:shadow-blue-300/70'
            : 'hover:shadow-orange-300/70'
        };
      case 'finished':
        return {
          bg: 'bg-gradient-to-br from-white to-yellow-50/30',
          border: 'border-yellow-200/50',
          shadow: 'shadow-yellow-100/50',
          hoverShadow: 'hover:shadow-yellow-200/70'
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
      transition={{ duration: 0.5, delay: parseInt(id.slice(1)) * 0.1 }}
      whileHover={{ scale: 1.03, y: -2 }}
      className={`
        ${cardStyle.bg} rounded-3xl p-8 shadow-xl transition-all duration-300
        border-2 ${cardStyle.border} ${cardStyle.hoverShadow}
        backdrop-blur-sm relative overflow-hidden
      `}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

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
            <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${
              type === 'washer' ? 'border-blue-200' : 'border-orange-200'
            }`}>
              {/* Inner Circle */}
              <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
                type === 'washer'
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                  : 'bg-gradient-to-br from-orange-500 to-orange-600'
              }`}>
                <span className="text-white text-2xl font-bold">{getMachineIcon(type)}</span>
              </div>
            </div>
            {/* Glow Effect for Active Machines */}
            {status === 'running' && (
              <div className={`absolute inset-0 rounded-full animate-pulse ${
                type === 'washer' ? 'bg-blue-400/20' : 'bg-orange-400/20'
              }`}></div>
            )}
          </motion.div>
        </div>

        {/* Machine Info */}
        <div className="text-center mb-6">
          <h3
            className="text-3xl font-black text-gray-800 mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {id}
          </h3>
          <p className={`text-sm font-semibold uppercase tracking-wide ${
            type === 'washer' ? 'text-blue-600' : 'text-orange-600'
          }`}>
            {getMachineLabel(id)}
          </p>
          <div className={`w-16 h-1 rounded-full mx-auto mt-2 ${
            type === 'washer'
              ? 'bg-gradient-to-r from-blue-500 to-blue-400'
              : 'bg-gradient-to-r from-orange-500 to-orange-400'
          }`}></div>
        </div>

        {/* Progress Bar */}
        {status === 'running' && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Progress
              </span>
              <span className={`text-lg font-black ${
                type === 'washer' ? 'text-blue-600' : 'text-orange-600'
              }`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`h-full rounded-full shadow-sm ${
                  type === 'washer'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-400'
                    : 'bg-gradient-to-r from-orange-500 to-orange-400'
                }`}
              />
            </div>
          </div>
        )}

        {/* Timer */}
        {status === 'running' && (
          <div className="text-center mb-8">
            <div className={`rounded-2xl p-4 border ${
              type === 'washer'
                ? 'bg-blue-50 border-blue-200'
                : 'bg-orange-50 border-orange-200'
            }`}>
              <div
                className="text-5xl font-black text-gray-800 tabular-nums mb-1"
                style={{ fontFamily: 'monospace' }}
              >
                {formatTime(timeLeft)}
              </div>
              <div className={`text-sm font-semibold uppercase tracking-wide ${
                type === 'washer' ? 'text-blue-600' : 'text-orange-600'
              }`}>
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
            <div className={`rounded-xl p-4 border ${
              type === 'washer'
                ? 'bg-blue-50 border-blue-200'
                : 'bg-orange-50 border-orange-200'
            }`}>
              <p className={`font-bold text-lg ${
                type === 'washer' ? 'text-blue-800' : 'text-orange-800'
              }`}>
                Siap digunakan! 🚀
              </p>
              <p className={`text-sm mt-1 ${
                type === 'washer' ? 'text-blue-700' : 'text-orange-700'
              }`}>
                Pilih mesin dan mulai {type === 'washer' ? 'cuci' : 'kering'}
              </p>
            </div>
          )}

          {status === 'finished' && (
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <p className="text-yellow-800 font-black text-xl">Yeay! Cucianmu udah selesai 🎉</p>
              <p className="text-yellow-700 text-sm mt-1">Ambil cucianmu sekarang</p>
            </div>
          )}

          {status === 'running' && (
            <div className={`rounded-xl p-4 border ${
              type === 'washer'
                ? 'bg-blue-50 border-blue-200'
                : 'bg-orange-50 border-orange-200'
            }`}>
              <p className={`font-bold text-lg ${
                type === 'washer' ? 'text-blue-800' : 'text-orange-800'
              }`}>
                Santai aja dulu! 😊
              </p>
              <p className={`text-sm mt-1 font-semibold ${
                type === 'washer' ? 'text-blue-700' : 'text-orange-700'
              }`}>
                Cucian lagi diproses dengan sempurna
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
