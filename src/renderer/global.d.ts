import { Game } from '../types/game';

declare global {
  interface Window {
    electronAPI: {
      getGames: () => Promise<Game[]>;
      saveGame: (game: Game) => Promise<Game[]>;
      deleteGame: (id: string) => Promise<Game[]>;
      launchGame: (exePath: string) => Promise<void>;
      selectExeFile: () => Promise<string | null>;
      selectImageFile: () => Promise<string | null>;
    };
  }
}

export {};