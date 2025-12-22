'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Loader2, Wind, PauseCircle } from 'lucide-react';
import { LaundryUnit } from '../lib/constants';

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

  // Machine panel display - industrial, not website
  return (
    <div
      className="border-2 border-white rounded-lg p-6 font-mono text-white min-h-[300px] relative"
      style={{ backgroundColor: '#12cfcb' }}
    >
      {/* Unit Label */}
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-white border-b border-white pb-2">
          UNIT {id}
        </div>
      </div>

      {/* Machines Status Grid */}
      <div className="space-y-6">
        {/* Dryer Status */}
        <div className="flex items-center justify-between p-3 rounded border-2 border-white bg-white">
          <div className="flex items-center gap-4">
            <div className="text-sm font-bold text-cyan-500 w-16">DRYER</div>
            <div className="flex items-center gap-2">
              {dryer.status === 'running' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-8 h-8 text-cyan-500" />
                </motion.div>
              ) : (
                <Wind className="w-8 h-8 text-gray-400" />
              )}
              <span className="text-lg font-mono font-bold text-cyan-500">{dryer.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {dryer.status === 'running' && (
              <div className="text-sm font-mono font-bold text-cyan-500">
                {Math.floor(dryerTimeLeft)}:{Math.floor((dryerTimeLeft % 1) * 60).toString().padStart(2, '0')}
              </div>
            )}
            <div className={`w-3 h-3 rounded-full ${
              dryer.status === 'available' ? 'bg-green-400' :
              dryer.status === 'running' ? 'bg-orange-400 animate-pulse' :
              'bg-red-400'
            }`} />
          </div>
        </div>

        {/* Washer Status */}
        <div className="flex items-center justify-between p-3 rounded border-2 border-white bg-white">
          <div className="flex items-center gap-4">
            <div className="text-sm font-bold text-cyan-500 w-16">WASHER</div>
            <div className="flex items-center gap-2">
              {washer.status === 'running' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-10 h-10 text-cyan-500" />
                </motion.div>
              ) : (
                <PauseCircle className="w-10 h-10 text-gray-400" />
              )}
              <span className="text-lg font-mono font-bold text-cyan-500">{washer.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {washer.status === 'running' && (
              <div className="text-sm font-mono font-bold text-cyan-500">
                {Math.floor(washerTimeLeft)}:{Math.floor((washerTimeLeft % 1) * 60).toString().padStart(2, '0')}
              </div>
            )}
            <div className={`w-3 h-3 rounded-full ${
              washer.status === 'available' ? 'bg-green-400' :
              washer.status === 'running' ? 'bg-orange-400 animate-pulse' :
              'bg-red-400'
            }`} />
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="mt-6 pt-4 border-t border-white">
        <div className="flex justify-between text-xs font-bold text-white">
          <span>Available: {washer.status === 'available' && dryer.status === 'available' ? '2' :
                           washer.status === 'available' || dryer.status === 'available' ? '1' : '0'}</span>
          <span>Running: {washer.status === 'running' && dryer.status === 'running' ? '2' :
                          washer.status === 'running' || dryer.status === 'running' ? '1' : '0'}</span>
        </div>
      </div>

      {/* Operator Controls - Only when needed */}
      {isOperator && (
        <div className="mt-4 space-y-2">
          {washer.status === 'available' && (
            <button
              onClick={() => onStartMachine?.(washer.id)}
              className="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded text-sm font-bold transition-colors"
            >
              START WASHER
            </button>
          )}
          {dryer.status === 'available' && (
            <button
              onClick={() => onStartMachine?.(dryer.id)}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded text-sm font-bold transition-colors"
            >
              START DRYER
            </button>
          )}
          {(washer.status === 'finished' || dryer.status === 'finished') && (
            <button
              onClick={() => {
                if (washer.status === 'finished') onFinishMachine?.(washer.id);
                if (dryer.status === 'finished') onFinishMachine?.(dryer.id);
              }}
              className="w-full bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded text-sm font-bold transition-colors"
            >
              FINISH CYCLE
            </button>
          )}
        </div>
      )}
    </div>
  );
}
