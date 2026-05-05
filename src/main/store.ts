import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { GameConfig } from '../types/game';

// 用户配置的游戏路径
const STORE_PATH = path.join(app.getPath('userData'), 'games.json');

function loadConfigs(): GameConfig[] {
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw) as GameConfig[];
  } catch {
    return [];
  }
}

function saveConfigs(configs: GameConfig[]): void {
  fs.writeFileSync(STORE_PATH, JSON.stringify(configs, null, 2), 'utf-8');
}

export function getConfigs(): GameConfig[] {
  return loadConfigs();
}

export function saveGameConfig(id: string, exePath: string): GameConfig[] {
  const configs = loadConfigs();
  const index = configs.findIndex((c) => c.id === id);
  if (index !== -1) {
    configs[index].exePath = exePath;
  } else {
    configs.push({ id, exePath });
  }
  saveConfigs(configs);
  return configs;
}