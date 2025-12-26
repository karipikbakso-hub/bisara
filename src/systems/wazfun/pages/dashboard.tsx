'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { WazfunHero } from '../components/WazfunHero';
import { LaundryUnitCard } from '../components/LaundryUnitCard';
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

export default function WazfunDashboard() {
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
      {/* Hero Section */}
      <WazfunHero />

      {/* Dashboard Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-4xl md:text-6xl font-black text-gray-800 mb-6"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Status Laundry Units
              </h2>
              <p
                className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium mb-8"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Setiap unit berisi mesin cuci (bawah) dan pengering (atas). Pantau status real-time semua unit laundry! 🏪
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-yellow-400 to-orange-500 rounded-full mx-auto"></div>
            </motion.div>
          </div>

          {/* Laundry Units Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {units.map(unit => (
              <LaundryUnitCard
                key={unit.id}
                unit={unit}
              />
            ))}
          </div>

          {/* Operator Access */}
          <div className="text-center mt-16">
            <a
              href="/systems/wazfun/operator"
              className="inline-flex items-center gap-3 bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              ⚙️ Akses Panel Operator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
