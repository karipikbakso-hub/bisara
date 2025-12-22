// WAZFUN System Exports
export { default as Dashboard } from './pages/dashboard';
export { default as Operator } from './pages/operator';
export { MachineCard } from './components/MachineCard';
export { WazfunHero } from './components/WazfunHero';

// System Configuration
export { default as config } from './config.json';

// Components export
export const components = {
  MachineCard: () => import('./components/MachineCard').then(m => ({ default: m.MachineCard })),
  WazfunHero: () => import('./components/WazfunHero').then(m => ({ default: m.WazfunHero })),
};

// Pages export
export const pages = {
  dashboard: () => import('./pages/dashboard'),
  operator: () => import('./pages/operator'),
};

// Utils export
export const utils = {
  // Add any system-specific utilities here
};
