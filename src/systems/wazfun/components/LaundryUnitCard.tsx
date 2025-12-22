'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { LaundryUnit, getMachineLabel, getMachineIcon } from '../lib/constants';

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
  onFinishMachine
}: LaundryUnitCardProps) {
  const { id, washer, dryer } = unit;

  const [washerTimeLeft, setWasherTimeLeft] = useState(0);
  const [dryerTimeLeft, setDryerTimeLeft] = useState(0);
  const [washerProgress, setWasherProgress] = useState(0);
  const [dryerProgress, setDryerProgress] = useState(0);

  useEffect(() => {
    const updateTimers = () => {
      // Washer timer
      if (washer.status === 'running' && washer.endTime) {
        const remaining = Math.max(0, washer.endTime - Date.now());
        const remainingMinutes = remaining / 60000;
        setWasherTimeLeft(remainingMinutes);
        const elapsed = washer.duration - remainingMinutes;
        setWasherProgress(Math.min(100, (elapsed / washer.duration) * 100));
      } else {
        setWasherTimeLeft(0);
        setWasherProgress(0);
      }

      // Dryer timer
      if (dryer.status === 'running' && dryer.endTime) {
        const remaining = Math.max(0, dryer.endTime - Date.now());
        const remainingMinutes = remaining / 60000;
        setDryerTimeLeft(remainingMinutes);
        const elapsed = dryer.duration - remainingMinutes;
        setDryerProgress(Math.min(100, (elapsed / dryer.duration) * 100));
      } else {
        setDryerTimeLeft(0);
        setDryerProgress(0);
      }
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);
    return () => clearInterval(interval);
  }, [washer.status, washer.endTime, washer.duration, dryer.status, dryer.endTime, dryer.duration]);

  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: id * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-blue-300 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-50 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10">
        {/* Unit Header */}
        <div className="text-center p-6 border-b border-slate-100">
          <h3
            className="text-2xl font-black text-slate-800 mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Unit {id}
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-slate-400 to-orange-500 rounded-full mx-auto"></div>
        </div>

        {/* Dryer Section (TOP - Smaller) */}
        <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-25 border-b border-orange-100">
          {/* Dryer Icon & Label */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-lg">{getMachineIcon('dryer')}</span>
              </div>
              <div>
                <div className="text-sm font-bold text-orange-800">{dryer.id}</div>
                <div className="text-xs text-orange-600">{getMachineLabel(dryer.id)}</div>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
              dryer.status === 'available' ? 'bg-green-100 text-green-800' :
              dryer.status === 'finished' ? 'bg-yellow-100 text-yellow-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {dryer.status === 'available' ? 'Tersedia' :
               dryer.status === 'running' ? 'Jalan' :
               'Selesai'}
            </div>
          </div>

          {/* Dryer Progress Bar */}
          {dryer.status === 'running' && (
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-orange-700">Progress</span>
                <span className="text-xs font-black text-orange-600">{Math.round(dryerProgress)}%</span>
              </div>
              <div className="w-full h-2 bg-orange-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dryerProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                />
              </div>
            </div>
          )}

          {/* Dryer Timer */}
          {dryer.status === 'running' && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-lg">
                <span className="text-sm font-mono font-bold text-orange-800">
                  {formatTime(dryerTimeLeft)}
                </span>
                <span className="text-xs text-orange-600">tersisa</span>
              </div>
            </div>
          )}

          {/* Dryer Controls (Operator Only) */}
          {isOperator && (
            <div className="mt-3">
              {dryer.status === 'available' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStartMachine?.(dryer.id)}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 px-3 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <Play className="w-3 h-3" />
                  Start Kering ({dryer.duration}m)
                </motion.button>
              )}

              {dryer.status === 'finished' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onFinishMachine?.(dryer.id)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-3 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  ✅ Selesai
                </motion.button>
              )}

              {dryer.status === 'running' && (
                <div className="text-center py-1">
                  <div className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 rounded-md">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-orange-700">Mengeringkan</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Dryer Status Message */}
          <div className="text-center mt-2">
            {dryer.status === 'available' && (
              <p className="text-xs text-orange-700">Siap digunakan untuk pengeringan</p>
            )}
            {dryer.status === 'finished' && (
              <p className="text-xs text-yellow-700 font-semibold">Cucian sudah kering! 🎉</p>
            )}
            {dryer.status === 'running' && (
              <p className="text-xs text-orange-700">Sedang mengeringkan cucian</p>
            )}
          </div>
        </div>

        {/* Washer Section (BOTTOM - Larger) */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-25">
          {/* Washer Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xl">{getMachineIcon('washer')}</span>
              </div>
              <div>
                <div className="text-base font-bold text-blue-800">{washer.id}</div>
                <div className="text-sm text-blue-600">{getMachineLabel(washer.id)}</div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              washer.status === 'available' ? 'bg-green-100 text-green-800' :
              washer.status === 'finished' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {washer.status === 'available' ? 'Tersedia' :
               washer.status === 'running' ? 'Jalan' :
               'Selesai'}
            </div>
          </div>

          {/* Washer Progress Bar */}
          {washer.status === 'running' && (
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-blue-700">Progress</span>
                <span className="text-sm font-black text-blue-600">{Math.round(washerProgress)}%</span>
              </div>
              <div className="w-full h-3 bg-blue-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${washerProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                />
              </div>
            </div>
          )}

          {/* Washer Timer */}
          {washer.status === 'running' && (
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-lg">
                <span className="text-lg font-mono font-bold text-blue-800">
                  {formatTime(washerTimeLeft)}
                </span>
                <span className="text-sm text-blue-600">tersisa</span>
              </div>
            </div>
          )}

          {/* Washer Controls (Operator Only) */}
          {isOperator && (
            <div className="mb-4">
              {washer.status === 'available' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStartMachine?.(washer.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <Play className="w-4 h-4" />
                  Start Cuci ({washer.duration}m)
                </motion.button>
              )}

              {washer.status === 'finished' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onFinishMachine?.(washer.id)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  ✅ Selesai
                </motion.button>
              )}

              {washer.status === 'running' && (
                <div className="text-center py-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-blue-700">Mencuci</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Washer Status Message */}
          <div className="text-center">
            {washer.status === 'available' && (
              <p className="text-sm text-blue-700">Siap digunakan untuk pencucian</p>
            )}
            {washer.status === 'finished' && (
              <p className="text-sm text-yellow-700 font-semibold">Cucian sudah bersih! 🎉</p>
            )}
            {washer.status === 'running' && (
              <p className="text-sm text-blue-700">Sedang mencuci cucian</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
