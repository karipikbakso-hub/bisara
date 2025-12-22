import { SystemConfig, SystemModule, SystemContext } from '../types/system';

const SYSTEM_CACHE = new Map<string, SystemModule>();

export async function loadSystem(systemId: string): Promise<SystemModule> {
  // Check cache first
  if (SYSTEM_CACHE.has(systemId)) {
    return SYSTEM_CACHE.get(systemId)!;
  }

  try {
    // Dynamic import of system module
    const systemModule = await import(`../../systems/${systemId}`);

    // Load system config
    const configResponse = await fetch(`/systems/${systemId}/config.json`);
    if (!configResponse.ok) {
      throw new Error(`Failed to load config for system: ${systemId}`);
    }
    const config: SystemConfig = await configResponse.json();

    // Validate config
    if (!config.enabled) {
      throw new Error(`System ${systemId} is disabled`);
    }

    const system: SystemModule = {
      config,
      components: systemModule.components || {},
      pages: systemModule.pages || {},
      utils: systemModule.utils || {}
    };

    // Cache the loaded system
    SYSTEM_CACHE.set(systemId, system);

    return system;
  } catch (error) {
    console.error(`Failed to load system ${systemId}:`, error);
    throw new Error(`System ${systemId} not found or failed to load`);
  }
}

export function createSystemContext(systemId: string, config: SystemConfig): SystemContext {
  return {
    systemId,
    config,
    theme: config.theme
  };
}

export async function getSystemConfig(systemId: string): Promise<SystemConfig | null> {
  try {
    const response = await fetch(`/systems/${systemId}/config.json`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function listAvailableSystems(): Promise<SystemConfig[]> {
  // In a real implementation, this would scan the systems directory
  // For now, we'll return a hardcoded list
  const systems = ['wazfun'];

  const configs: SystemConfig[] = [];

  for (const systemId of systems) {
    const config = await getSystemConfig(systemId);
    if (config && config.enabled) {
      configs.push(config);
    }
  }

  return configs;
}

export function clearSystemCache(): void {
  SYSTEM_CACHE.clear();
}

export function applySystemTheme(theme: SystemConfig['theme']): void {
  // Apply CSS custom properties for theme colors
  if (theme.colors.primary) {
    document.documentElement.style.setProperty('--system-primary', theme.colors.primary);
  }
  if (theme.colors.secondary) {
    document.documentElement.style.setProperty('--system-secondary', theme.colors.secondary);
  }
  if (theme.colors.accent) {
    document.documentElement.style.setProperty('--system-accent', theme.colors.accent);
  }
  if (theme.colors.background) {
    document.documentElement.style.setProperty('--system-background', theme.colors.background);
  }

  // Load system fonts if specified
  if (theme.fonts && theme.fonts.length > 0) {
    const fontLinks = theme.fonts.map(font => {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${font}:wght@300;400;500;600;700;800;900&display=swap`;
      link.rel = 'stylesheet';
      return link;
    });

    fontLinks.forEach(link => {
      // Check if font is already loaded
      const existingLink = document.querySelector(`link[href="${link.href}"]`);
      if (!existingLink) {
        document.head.appendChild(link);
      }
    });
  }
}
