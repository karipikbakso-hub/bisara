'use client';

import { useState, useEffect } from 'react';

interface Machine {
  id: number;
  status: 'available' | 'in_use' | 'finished';
  endTime?: number;
}

export default function Operator() {
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

  const startMachine = (id: number, duration: number) => {
    setMachines(prev => prev.map(machine =>
      machine.id === id ? { ...machine, status: 'in_use', endTime: Date.now() + duration * 60000 } : machine
    ));
  };

  const finishMachine = (id: number) => {
    setMachines(prev => prev.map(machine =>
      machine.id === id ? { ...machine, status: 'available', endTime: undefined } : machine
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Operator WWAZFUUN</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {machines.map(machine => (
          <div key={machine.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Mesin {machine.id}</h2>
            <p className="mb-4 text-center">Status: {machine.status}</p>
            {machine.status === 'available' && (
              <div className="space-y-2">
                <button
                  onClick={() => startMachine(machine.id, 30)}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Mulai 30 menit
                </button>
                <button
                  onClick={() => startMachine(machine.id, 60)}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Mulai 60 menit
                </button>
              </div>
            )}
            {machine.status === 'finished' && (
              <button
                onClick={() => finishMachine(machine.id)}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Selesai
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="/wazfun" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Kembali ke Publik
        </a>
      </div>
    </div>
  );
}