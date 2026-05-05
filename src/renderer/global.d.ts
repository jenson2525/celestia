import { GameConfig } from '../types/game';

declare global {
  interface Window {
    electronAPI: {
      getConfigs: () => Promise<GameConfig[]>;
      saveConfig: (id: string, exePath: string) => Promise<GameConfig[]>;
      launchGame: (exePath: string) => Promise<void>;
      selectExeFile: () => Promise<string | null>;
    };
  }
}

export {};