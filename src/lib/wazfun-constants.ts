export interface Machine {
  id: number;
  status: 'available' | 'washing' | 'drying' | 'wash_dry' | 'finished';
  washEndTime?: number;
  dryEndTime?: number;
}

export const INITIAL_MACHINES: Machine[] = [
  { id: 1, status: 'available' },
  { id: 2, status: 'available' },
  { id: 3, status: 'available' },
  { id: 4, status: 'available' },
  { id: 5, status: 'available' },
  { id: 6, status: 'available' },
  { id: 7, status: 'available' },
  { id: 8, status: 'available' },
];

export const LOCAL_STORAGE_KEY = 'wazfun-machines';

export const WASH_DURATION_MINUTES = 40;
export const DRY_DURATION_MINUTES = 50;
export const WASH_DRY_TOTAL_MINUTES = 90;

// Utility functions for machine management
export const createMachineFromStorage = (storedData: any[]): Machine[] => {
  // Merge stored data with initial machines, ensuring all 8 machines exist
  const machines = [...INITIAL_MACHINES];

  storedData.forEach((storedMachine: any) => {
    const index = machines.findIndex(m => m.id === storedMachine.id);
    if (index !== -1) {
      machines[index] = {
        ...machines[index],
        ...storedMachine,
        // Ensure status is valid
        status: storedMachine.status || 'available'
      };
    }
  });

  return machines;
};

export const isValidMachineData = (data: any): boolean => {
  return Array.isArray(data) &&
         data.length > 0 &&
         data.every(machine =>
           machine.id &&
           typeof machine.id === 'number' &&
           ['available', 'washing', 'drying', 'wash_dry', 'finished'].includes(machine.status)
         );
};
