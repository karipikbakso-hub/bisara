export interface SystemConfig {
  id: string;
  name: string;
  version: string;
  description?: string;
  routes: Record<string, string>;
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent?: string;
      background?: string;
    };
    fonts?: string[];
  };
  features: string[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SystemModule {
  config: SystemConfig;
  components: Record<string, React.ComponentType<any>>;
  pages: Record<string, React.ComponentType<any>>;
  utils?: Record<string, any>;
}

export interface SystemContext {
  systemId: string;
  config: SystemConfig;
  theme: SystemConfig['theme'];
}
