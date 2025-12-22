export interface Machine {
  id: string; // "W1", "D1", "W2", "D2", etc.
  type: 'washer' | 'dryer';
  status: 'available' | 'running' | 'finished';
  endTime?: number;
  duration: number; // in minutes
}

export interface LaundryUnit {
  id: number; // Unit number (1, 2, 3, 4)
  washer: Machine;
  dryer: Machine;
}

// Individual machines (for backward compatibility)
export const MACHINES: Machine[] = [
  // Washers
  { id: 'W1', type: 'washer', status: 'available', duration: 40 },
  { id: 'D1', type: 'dryer', status: 'available', duration: 50 },
  { id: 'W2', type: 'washer', status: 'available', duration: 40 },
  { id: 'D2', type: 'dryer', status: 'available', duration: 50 },
  { id: 'W3', type: 'washer', status: 'available', duration: 40 },
  { id: 'D3', type: 'dryer', status: 'available', duration: 50 },
  { id: 'W4', type: 'washer', status: 'available', duration: 40 },
  { id: 'D4', type: 'dryer', status: 'available', duration: 50 },
  { id: 'W5', type: 'washer', status: 'available', duration: 40 },
  { id: 'D5', type: 'dryer', status: 'available', duration: 50 },
  { id: 'W6', type: 'washer', status: 'available', duration: 40 },
  { id: 'D6', type: 'dryer', status: 'available', duration: 50 },
  { id: 'W7', type: 'washer', status: 'available', duration: 40 },
  { id: 'D7', type: 'dryer', status: 'available', duration: 50 },
  { id: 'W8', type: 'washer', status: 'available', duration: 40 },
  { id: 'D8', type: 'dryer', status: 'available', duration: 50 },
];

// Laundry units (paired washer + dryer)
export const LAUNDRY_UNITS: LaundryUnit[] = [
  {
    id: 1,
    washer: { id: 'W1', type: 'washer', status: 'available', duration: 40 },
    dryer: { id: 'D1', type: 'dryer', status: 'available', duration: 50 }
  },
  {
    id: 2,
    washer: { id: 'W2', type: 'washer', status: 'available', duration: 40 },
    dryer: { id: 'D2', type: 'dryer', status: 'available', duration: 50 }
  },
  {
    id: 3,
    washer: { id: 'W3', type: 'washer', status: 'available', duration: 40 },
    dryer: { id: 'D3', type: 'dryer', status: 'available', duration: 50 }
  },
  {
    id: 4,
    washer: { id: 'W4', type: 'washer', status: 'available', duration: 40 },
    dryer: { id: 'D4', type: 'dryer', status: 'available', duration: 50 }
  },
  {
    id: 5,
    washer: { id: 'W5', type: 'washer', status: 'available', duration: 40 },
    dryer: { id: 'D5', type: 'dryer', status: 'available', duration: 50 }
  },
  {
    id: 6,
    washer: { id: 'W6', type: 'washer', status: 'available', duration: 40 },
    dryer: { id: 'D6', type: 'dryer', status: 'available', duration: 50 }
  },
  {
    id: 7,
    washer: { id: 'W7', type: 'washer', status: 'available', duration: 40 },
    dryer: { id: 'D7', type: 'dryer', status: 'available', duration: 50 }
  },
  {
    id: 8,
    washer: { id: 'W8', type: 'washer', status: 'available', duration: 40 },
    dryer: { id: 'D8', type: 'dryer', status: 'available', duration: 50 }
  }
];

export const LOCAL_STORAGE_KEY = 'wazfun-machines';

export const WASH_DURATION_MINUTES = 40;
export const DRY_DURATION_MINUTES = 50;

// Utility functions for machine management
export const createMachineFromStorage = (storedData: any[]): Machine[] => {
  // Merge stored data with initial machines
  const machines = [...MACHINES];

  storedData.forEach((storedMachine: any) => {
    const index = machines.findIndex(m => m.id === storedMachine.id);
    if (index !== -1) {
      machines[index] = {
        ...machines[index],
        ...storedMachine,
        // Ensure type and duration remain correct
        type: machines[index].type,
        duration: machines[index].duration
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
           (machine.type === 'washer' || machine.type === 'dryer') &&
           ['available', 'running', 'finished'].includes(machine.status)
         );
};

export const getMachineLabel = (id: string): string => {
  if (id.startsWith('W')) return `Washer ${id.slice(1)}`;
  if (id.startsWith('D')) return `Dryer ${id.slice(1)}`;
  return id;
};

export const getMachineIcon = (type: 'washer' | 'dryer') => {
  return type === 'washer' ? '🌀' : '💨';
};

export const getMachineColor = (type: 'washer' | 'dryer') => {
  return type === 'washer' ? 'blue' : 'orange';
};
