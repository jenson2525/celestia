import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import { Game } from '../types/game';

// games.json 存储在系统用户数据目录下，避免与应用安装目录混用
// C:\Users\{用户名}\AppData\Roaming\celestia\games.json
const STORE_PATH = path.join(app.getPath('userData'), 'games.json');

function loadGames(): Game[] {
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw) as Game[];
  } catch {
    return [];  // 文件不存在或内容损坏时，降级为空列表
  }
}

function saveGames(games: Game[]): void {
  fs.writeFileSync(STORE_PATH, JSON.stringify(games, null, 2), 'utf-8');
}

export function getGames(): Game[] {
  return loadGames();
}

export function addGame(game: Game): Game[] {
  const games = loadGames();
  games.push(game);
  saveGames(games);
  return games;
}

export function updateGame(id: string, patch: Partial<Game>): Game[] {
  const games = loadGames();
  const index = games.findIndex((g) => g.id === id);
  if (index !== -1) {
    games[index] = { ...games[index], ...patch };
    saveGames(games);
  }
  return games;
}

export function removeGame(id: string): Game[] {
  const games = loadGames();
  const filtered = games.filter((g) => g.id !== id);
  saveGames(filtered);
  return filtered;
}