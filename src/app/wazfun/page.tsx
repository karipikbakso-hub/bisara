'use client';

import { useState, useEffect } from 'react';

interface Machine {
  id: number;
  status: 'available' | 'in_use' | 'finished';
  endTime?: number;
}

export default function WazfunLaundry() {
  const [machines, setMachines] = useState<Machine[]>([
    { id: 1, status: 'available' },
    { id: 2, status: 'available' },
    { id: 3, status: 'available' },
  ]);

  useEffect(() => {
    const stored = localStorage.getItem('wazfun-machines');
    if (stored) {
      setMachines(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wazfun-machines', JSON.stringify(machines));
  }, [machines]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prev => prev.map(machine => {
        if (machine.status === 'in_use' && machine.endTime && Date.now() > machine.endTime) {
          return { ...machine, status: 'finished' };
        }
        return machine;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRemainingTime = (endTime: number) => {
    const remaining = Math.max(0, endTime - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">WWAZFUUN Laundry Self Service</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {machines.map(machine => (
          <div key={machine.id} className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Mesin {machine.id}</h2>
            <div className={`text-lg font-medium mb-4 ${
              machine.status === 'available' ? 'text-green-600' :
              machine.status === 'in_use' ? 'text-blue-600' : 'text-red-600'
            }`}>
              {machine.status === 'available' && 'Tersedia'}
              {machine.status === 'in_use' && `Sedang Digunakan - Sisa ${getRemainingTime(machine.endTime!)}`}
              {machine.status === 'finished' && 'Selesai - Siap Ambil'}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="/wazfun/operator" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Akses Operator
        </a>
      </div>
    </div>
  );
}