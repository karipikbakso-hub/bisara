import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Machine, MACHINES, LAUNDRY_UNITS, LaundryUnit } from '../systems/wazfun/lib/constants';

interface LaundryState {
  machines: Machine[];
  units: LaundryUnit[];
  startMachine: (id: string) => void;
  finishMachine: (id: string) => void;
}

export const useLaundryStore = create<LaundryState>()(
  persist(
    (set, get) => ({
      machines: MACHINES,
      units: LAUNDRY_UNITS,

      startMachine: (id: string) => {
        set((state) => {
          const updatedMachines = state.machines.map(machine =>
            machine.id === id ? {
              ...machine,
              status: 'running' as const,
              endTime: Date.now() + machine.duration * 60000
            } : machine
          );

          const updatedUnits = state.units.map(unit => ({
            ...unit,
            washer: updatedMachines.find(m => m.id === unit.washer.id) || unit.washer,
            dryer: updatedMachines.find(m => m.id === unit.dryer.id) || unit.dryer
          }));

          return {
            machines: updatedMachines,
            units: updatedUnits
          };
        });
      },

      finishMachine: (id: string) => {
        set((state) => {
          const updatedMachines = state.machines.map(machine =>
            machine.id === id ? {
              ...machine,
              status: 'available' as const,
              endTime: undefined
            } : machine
          );

          const updatedUnits = state.units.map(unit => ({
            ...unit,
            washer: updatedMachines.find(m => m.id === unit.washer.id) || unit.washer,
            dryer: updatedMachines.find(m => m.id === unit.dryer.id) || unit.dryer
          }));

          return {
            machines: updatedMachines,
            units: updatedUnits
          };
        });
      },
    }),
    {
      name: 'wazfun-laundry-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        machines: state.machines
      }),
      // Handle rehydration - restart timer and sync units after data is loaded
      onRehydrateStorage: () => (state) => {
        if (state && typeof window !== 'undefined') {
          // Update units to reflect loaded machines
          const updatedUnits = LAUNDRY_UNITS.map(unit => ({
            ...unit,
            washer: state.machines.find(m => m.id === unit.washer.id) || unit.washer,
            dryer: state.machines.find(m => m.id === unit.dryer.id) || unit.dryer
          }));

          state.units = updatedUnits;

          // Start the timer after rehydration
          startTimer();
        }
      }
    }
  )
);

// Auto timer function - runs outside store for performance
let timerInterval: NodeJS.Timeout | null = null;

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    const store = useLaundryStore.getState();
    const machines = store.machines;
    const now = Date.now();

    const updatedMachines = machines.map(machine => {
      if (machine.status === 'running' && machine.endTime && now > machine.endTime) {
        return { ...machine, status: 'finished' as const, endTime: undefined };
      }
      return machine;
    });

    // Only update if there are actual changes
    const hasChanges = updatedMachines.some((m, i) => m.status !== machines[i].status);

    if (hasChanges) {
      const currentUnits = useLaundryStore.getState().units;
      const updatedUnits = currentUnits.map(unit => ({
        ...unit,
        washer: updatedMachines.find(m => m.id === unit.washer.id) || unit.washer,
        dryer: updatedMachines.find(m => m.id === unit.dryer.id) || unit.dryer
      }));

      useLaundryStore.setState({
        machines: updatedMachines,
        units: updatedUnits
      });
    }
  }, 1000);
};

// Start timer on client-side
if (typeof window !== 'undefined') {
  startTimer();
}
