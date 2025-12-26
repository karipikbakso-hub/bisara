'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LaundryUnit, getTimeLeft, formatTime } from '../lib/constants';

interface LaundryUnitCardProps {
  unit: LaundryUnit;
  isOperator?: boolean;
  onStartMachine?: (machineId: string) => void;
  onFinishMachine?: (machineId: string) => void;
}

export function LaundryUnitCard({
  unit,
  isOperator = false,
  onStartMachine,
  onFinishMachine,
}: LaundryUnitCardProps) {
  const { id, washer, dryer } = unit;

  const [washerTimeLeft, setWasherTimeLeft] = useState(0);
  const [dryerTimeLeft, setDryerTimeLeft] = useState(0);
  const [washerProgress, setWasherProgress] = useState(0);
  const [dryerProgress, setDryerProgress] = useState(0);

  // Update timers every second
  useEffect(() => {
    const updateTimers = () => {
      if (washer.status === 'running' && washer.startTimestamp) {
        const t = getTimeLeft(washer);
        setWasherTimeLeft(t);
        setWasherProgress(
          Math.round(Math.min(100, ((washer.duration - t) / washer.duration) * 100))
        );
      } else {
        setWasherTimeLeft(0);
        setWasherProgress(0);
      }

      if (dryer.status === 'running' && dryer.startTimestamp) {
        const t = getTimeLeft(dryer);
        setDryerTimeLeft(t);
        setDryerProgress(
          Math.round(Math.min(100, ((dryer.duration - t) / dryer.duration) * 100))
        );
      } else {
        setDryerTimeLeft(0);
        setDryerProgress(0);
      }
    };

    updateTimers();
    const i = setInterval(updateTimers, 1000);
    return () => clearInterval(i);
  }, [
    washer.status,
    washer.startTimestamp,
    washer.duration,
    dryer.status,
    dryer.startTimestamp,
    dryer.duration,
  ]);

  // Helper: Get status styling
  const getStatusStyle = (status: string, type: 'dryer' | 'washer') => {
    if (status === 'running') {
      return type === 'dryer'
        ? 'brightness-110 ring-4 ring-white shadow-lg shadow-white/50'
        : 'brightness-110 ring-2 ring-blue-400 shadow-lg shadow-blue-500/50';
    }
    if (status === 'finished') {
      return 'brightness-105 ring-2 ring-yellow-400 shadow-lg shadow-yellow-500/50';
    }
    return 'opacity-60 grayscale';
  };

  return (
    <div 
      className="relative rounded-3xl overflow-hidden shadow-2xl"
      style={{
        background: 'linear-gradient(180deg, #17CBC7 0%, #14B8B4 100%)',
      }}
    >
      {/* ===================== HEADER ===================== */}
      <div className="relative bg-gradient-to-b from-[#17CBC7] to-[#15C0BC] pt-3 pb-3">
       
      </div>

      {/* ===================== MAIN BODY ===================== */}
      <div className="bg-gradient-to-b from-[#15C0BC] to-[#13B3AF] px-4 pb-6">
        
        {/* ===================== DRYER (TOP) ===================== */}
        <div className="mb-6">
          {/* Unit Number + Label */}
          <div className="flex items-center justify-between mb-3">
            <div className="bg-white/90 text-[#13B3AF] font-black text-lg px-4 py-1.5 rounded-lg shadow-md">
              {id}
            </div>
            <div className="text-white/80 text-xs font-semibold tracking-wider">
              PENGERING
            </div>
          </div>

          {/* Dryer Glass Window */}
          <div className="relative mb-3">
            <div
              className={`w-full h-24 rounded-[30px] border-[6px] border-white/30 overflow-hidden shadow-inner transition-all duration-300 ${getStatusStyle(dryer.status, 'dryer')}`}
              style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                ...(dryer.status === 'running' && {
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6), 0 0 0 6px #fafafa, 0 0 20px #fafafa'
                })
              }}
            >
              {/* Inner Glass Reflection */}
              <div className="absolute inset-3 rounded-[20px] border-2 border-white/10" />
              
              {/* ✅ RUNNING: Rotating drum spokes with heat glow */}
              {dryer.status === 'running' && (
                <>
                  {/* Heat Glow Background */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 20%, rgba(239, 68, 68, 0.2) 60%, transparent 100%)'
                    }}
                  />

                  {/* Rotating Drum Spokes (like real dryer) */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {/* Spoke pattern - 6 spokes */}
                    {[0, 60, 120, 180, 240, 300].map((angle) => (
                      <div
                        key={angle}
                        className="absolute w-0.5 h-16 bg-gradient-to-t from-orange-400/80 via-orange-300/60 to-transparent"
                        style={{
                          transform: `rotate(${angle}deg)`,
                          transformOrigin: 'center',
                        }}
                      />
                    ))}
                    {/* Center hub */}
                    <div className="w-4 h-4 rounded-full bg-orange-400/60 shadow-lg shadow-orange-500/50" />
                  </motion.div>
                </>
              )}

              {/* ✅ FINISHED: Static indicator */}
              {dryer.status === 'finished' && (
                <div className="absolute inset-0 flex items-center justify-center bg-yellow-500/20">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="text-4xl"
                  >
                    🔥
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* Dryer Control Panel */}
          <div className={`bg-white/15 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 transition-all duration-300 ${
            dryer.status === 'running' ? 'ring-1 ring-orange-400/50' : ''
          }`}>
            <div className="flex items-center justify-between">
              <div className="text-white font-mono text-sm font-bold">
                {dryer.id}
              </div>
              
              <div>
                {dryer.status === 'running' ? (
                  <div className="bg-black/90 text-orange-400 font-mono text-sm font-bold px-3 py-1 rounded-md">
                    {formatTime(dryerTimeLeft)}
                  </div>
                ) : dryer.status === 'finished' ? (
                  <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-md uppercase">
                    Selesai
                  </div>
                ) : (
                  <div className="text-white/60 text-xs font-semibold uppercase">
                    TERSEDIA
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            {dryer.status === 'running' && (
              <div className="mt-2 h-3 bg-white/30 rounded-full overflow-hidden relative">
                <motion.div
                  style={{ width: `${dryerProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                  {dryerProgress}%
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-white/20 my-4" />

        {/* ===================== WASHER (BOTTOM) ===================== */}
        <div>
          <div className="text-white/80 text-xs font-semibold tracking-wider mb-3 text-right">
            PENCUCI
          </div>

          {/* Washer Machine Body */}
          <div
            className={`rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${getStatusStyle(washer.status, 'washer')}`}
            style={{
              background: 'linear-gradient(180deg, #E8E8E8 0%, #D4D4D4 100%)',
            }}
          >
            {/* Control Panel Strip - Curved like Amazon smile */}
            <div className="relative bg-[#15C0BC] h-10 flex items-end pb-1">
              {/* Curved shape */}
              <div 
                className="absolute inset-0 bg-[#15C0BC]"
                style={{
                  borderBottomLeftRadius: '50% 30%',
                  borderBottomRightRadius: '50% 30%',
                }}
              />
              
              {/* Controls */}
              <div className="relative z-10 w-full flex items-center justify-between px-3 pb-1">
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center">
                    <div className="w-3 h-3 bg-white/40 rounded-sm" />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-8 h-4 bg-black/30 rounded-sm" />
                    <div className="w-8 h-4 bg-black/30 rounded-sm" />
                  </div>
                </div>
                <div className={`w-6 h-6 bg-white/90 rounded-md flex items-center justify-center transition-all duration-300 ${
                  washer.status === 'running' ? 'ring-2 ring-blue-400 shadow-lg shadow-blue-400/50 animate-pulse' : ''
                }`}>
                  <div className="w-2 h-2 bg-[#15C0BC] rounded-full" />
                </div>
              </div>
            </div>

            {/* Washer Drum Section */}
            <div className="p-4 pb-6">
              {/* Circular Drum */}
              <div className="flex justify-center mb-3">
                <div
                  className="relative w-36 h-36 rounded-full border-[8px] border-gray-400 overflow-hidden"
                  style={{
                    background: 'radial-gradient(circle, #1a1a1a 0%, #0a0a0a 100%)',
                    boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Glass Reflection */}
                  <div className="absolute inset-4 rounded-full border-2 border-white/10" />
                  
                  {/* ✅ RUNNING: Rotating drum with lifters (like real washer) */}
                  {washer.status === 'running' && (
                    <>
                      {/* Water Fill */}
                      <motion.div
                        animate={{ 
                          opacity: [0.5, 0.7, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-b from-blue-400/50 to-blue-600/60"
                      />
                      
                      {/* Rotating Drum with Lifter Pattern */}
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        {/* Lifter spokes - 12 spokes like real washer drum */}
                        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                          <div
                            key={angle}
                            className="absolute w-1 h-20 bg-gradient-to-t from-white/60 via-white/40 to-transparent rounded-full"
                            style={{
                              transform: `rotate(${angle}deg)`,
                              transformOrigin: 'center',
                            }}
                          />
                        ))}
                        {/* Drum center hub */}
                        <div className="w-6 h-6 rounded-full bg-white/30 border-2 border-white/50" />
                      </motion.div>

                      {/* Bubbles effect */}
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-white/30 blur-sm"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-white/30 blur-sm"
                      />
                    </>
                  )}

                  {/* ✅ FINISHED: Success indicator */}
                  {washer.status === 'finished' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-yellow-500/20">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
                        className="text-5xl"
                      >
                        🎉
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>

              {/* Washer Info Panel */}
              <div className={`bg-white/90 rounded-xl p-2.5 shadow-md transition-all duration-300 ${
                washer.status === 'running' ? 'ring-1 ring-blue-400/50' : ''
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[#13B3AF] font-mono text-sm font-bold">
                    {washer.id}
                  </div>
                  <div>
                    {washer.status === 'running' ? (
                      <div className="bg-black text-green-400 font-mono text-sm font-bold px-3 py-1 rounded-md">
                        {formatTime(washerTimeLeft)}
                      </div>
                    ) : washer.status === 'finished' ? (
                      <div className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-md uppercase">
                        Selesai
                      </div>
                    ) : (
                      <div className="text-gray-500 text-xs font-semibold uppercase">
                        TERSEDIA
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {washer.status === 'running' && (
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden relative">
                    <motion.div
                      style={{ width: `${washerProgress}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-xs">
                      {washerProgress}%
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Wazfun Branding Footer */}
            <div className="bg-[#15C0BC] py-2 text-center">
              <div className="text-white font-black text-lg tracking-wide">
                wazfun
              </div>
            </div>
          </div>
        </div>

        {/* ===================== OPERATOR CONTROLS ===================== */}
        {isOperator && (
          <div className="mt-4 space-y-2">
            {/* Start Washer */}
            {washer.status === 'available' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStartMachine?.(washer.id)}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                ▶ MULAI PENCUCI
              </motion.button>
            )}

            {/* Start Dryer */}
            {dryer.status === 'available' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStartMachine?.(dryer.id)}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                ▶ MULAI PENGERING
              </motion.button>
            )}

            {/* Finish Button (for both machines) */}
            {(washer.status === 'finished' || dryer.status === 'finished') && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (washer.status === 'finished') onFinishMachine?.(washer.id);
                  if (dryer.status === 'finished') onFinishMachine?.(dryer.id);
                }}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                ✓ SELESAIKAN SIKLUS
              </motion.button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}