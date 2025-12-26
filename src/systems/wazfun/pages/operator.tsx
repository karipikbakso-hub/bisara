'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Settings, ArrowLeft } from 'lucide-react';
import {
  Machine,
  LaundryUnit,
  MACHINES,
  LAUNDRY_UNITS,
  LOCAL_STORAGE_KEY,
  createMachineFromStorage,
  isValidMachineData,
  cleanStaleData,
  saveMachines,
  getTimeLeft
} from '../lib/constants';
import { LaundryUnitCard } from '../components/LaundryUnitCard';

export default function WazfunOperator() {
  const [machines, setMachines] = useState<Machine[]>(MACHINES);
  const [units, setUnits] = useState<LaundryUnit[]>(LAUNDRY_UNITS);
  const isInitialMount = useRef(true);

  // ✅ FIXED: Initialization with stale data cleanup
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        if (isValidMachineData(parsedData)) {
          // Clean stale data before merging
          const cleanedData = cleanStaleData(parsedData);
          const mergedMachines = createMachineFromStorage(cleanedData);
          
          setMachines(mergedMachines);

          // Update units with merged machine data
          const updatedUnits = LAUNDRY_UNITS.map(unit => ({
            ...unit,
            washer: mergedMachines.find(m => m.id === unit.washer.id) || unit.washer,
            dryer: mergedMachines.find(m => m.id === unit.dryer.id) || unit.dryer
          }));
          setUnits(updatedUnits);
        }
      } catch (error) {
        console.warn('Invalid localStorage data, using defaults');
      }
    }
    isInitialMount.current = false;
  }, []);

  // ✅ FIXED: Save only on status change (not timer updates)
  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }

    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsedStored = JSON.parse(stored);
        
        // Check if status or startTimestamp changed (user interaction)
        const hasStatusChange = machines.some(machine => {
          const storedMachine = parsedStored.find((m: any) => m.id === machine.id);
          return storedMachine && (
            storedMachine.status !== machine.status ||
            storedMachine.startTimestamp !== machine.startTimestamp
          );
        });

        if (hasStatusChange) {
          saveMachines(machines);
        }
      } catch (error) {
        saveMachines(machines);
      }
    } else {
      saveMachines(machines);
    }
  }, [machines]);

  // ✅ FIXED: Start machine with startTimestamp
  const startMachine = (id: string) => {
    const now = Date.now();
    
    setMachines(prev => {
      const updated = prev.map(machine =>
        machine.id === id ? {
          ...machine,
          status: 'running' as const,
          startTimestamp: now
        } : machine
      );
      
      // Force immediate save
      saveMachines(updated);
      
      return updated;
    });
  };

  // ✅ FIXED: Finish machine clears startTimestamp
  const finishMachine = (id: string) => {
    setMachines(prev => {
      const updated = prev.map(machine =>
        machine.id === id ? {
          ...machine,
          status: 'available' as const,
          startTimestamp: undefined
        } : machine
      );
      
      // Force immediate save
      saveMachines(updated);
      
      return updated;
    });
  };

  // ✅ FIXED: Timer interval using startTimestamp
  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prev => {
        let hasChanges = false;
        
        const updatedMachines = prev.map(machine => {
          // Check if timer expired using startTimestamp
          if (machine.status === 'running' && machine.startTimestamp) {
            const timeLeft = getTimeLeft(machine);
            
            if (timeLeft <= 0) {
              hasChanges = true;
              return {
                ...machine,
                status: 'available' as const, // ✅ AUTO FINISH TO AVAILABLE
                startTimestamp: undefined
              };
            }
          }
          return machine;
        });

        // Save immediately when status changes
        if (hasChanges) {
          saveMachines(updatedMachines);
          
          // Update units
          const updatedUnits = LAUNDRY_UNITS.map(unit => ({
            ...unit,
            washer: updatedMachines.find(m => m.id === unit.washer.id) || unit.washer,
            dryer: updatedMachines.find(m => m.id === unit.dryer.id) || unit.dryer
          }));
          setUnits(updatedUnits);
        }

        return updatedMachines;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // ✅ NEW: Multi-tab sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        try {
          const parsedData = JSON.parse(e.newValue);
          if (isValidMachineData(parsedData)) {
            const cleanedData = cleanStaleData(parsedData);
            const mergedMachines = createMachineFromStorage(cleanedData);
            
            setMachines(mergedMachines);
            
            // Update units
            const updatedUnits = LAUNDRY_UNITS.map(unit => ({
              ...unit,
              washer: mergedMachines.find(m => m.id === unit.washer.id) || unit.washer,
              dryer: mergedMachines.find(m => m.id === unit.dryer.id) || unit.dryer
            }));
            setUnits(updatedUnits);
          }
        } catch (error) {
          console.warn('Invalid storage event data');
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-slate-600/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <a
              href="/systems/wazfun"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Kembali ke Dashboard</span>
            </a>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>WAZFUN</h1>
                <p className="text-sm text-slate-300">Panel Operator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-slate-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-4xl md:text-5xl font-black text-slate-800 mb-4"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Kontrol Mesin Cuci
              </h2>
              <p
                className="text-xl text-slate-600 max-w-2xl mx-auto font-medium"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Kelola operasi laundry dengan mudah. Start, stop, dan monitor semua mesin dari satu tempat! ⚙️
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-slate-600 rounded-full mx-auto mt-6"></div>
            </motion.div>
          </div>

          {/* Laundry Units Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {units.map(unit => (
              <LaundryUnitCard
                key={unit.id}
                unit={unit}
                isOperator={true}
                onStartMachine={startMachine}
                onFinishMachine={finishMachine}
              />
            ))}
          </div>

          {/* Stats Footer */}
          <div className="mt-16 bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-black text-green-600 mb-2">
                  {machines.filter(m => m.status === 'available').length}
                </div>
                <div className="text-slate-600 font-medium">Mesin Tersedia</div>
              </div>
              <div>
                <div className="text-3xl font-black text-blue-600 mb-2">
                  {machines.filter(m => m.status === 'running').length}
                </div>
                <div className="text-slate-600 font-medium">Sedang Jalan</div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-600 mb-2">
                  {machines.length}
                </div>
                <div className="text-slate-600 font-medium">Total Mesin</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
