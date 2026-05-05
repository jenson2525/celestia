import { ipcMain, dialog } from 'electron';
import { spawn } from 'child_process';
import { Game } from '../types/game';
import { getGames, addGame, updateGame, removeGame } from './store';

export function registerIpcHandlers(): void {
  ipcMain.handle('games:getAll', () => {
    return getGames();
  });

  ipcMain.handle('games:save', (_event, game: Game) => {
    if (game.id) {
      return updateGame(game.id, game);
    }
    // 新增游戏时生成唯一 id 和创建时间
    const newGame: Game = {
      ...game,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    return addGame(newGame);
  });

  ipcMain.handle('games:delete', (_event, id: string) => {
    return removeGame(id);
  });

  ipcMain.handle('game:launch', (_event, exePath: string) => {
    // detached: true 让游戏进程脱离 Celestia 独立运行
    // unref() 解除父子进程关联，Celestia 关闭后游戏不受影响
    const child = spawn(exePath, [], {
      detached: true,
      stdio: 'ignore',
    });
    child.unref();
  });

  ipcMain.handle('dialog:selectExe', async (event) => {
    const win = require('electron').BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showOpenDialog(win!, {
      title: '选择游戏可执行文件',
      filters: [{ name: '可执行文件', extensions: ['exe'] }],
      properties: ['openFile'],
    });
    return result.canceled ? null : result.filePaths[0];
  });

  ipcMain.handle('dialog:selectImage', async (event) => {
    const win = require('electron').BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showOpenDialog(win!, {
      title: '选择封面图片',
      filters: [{ name: '图片文件', extensions: ['png', 'jpg', 'jpeg', 'webp'] }],
      properties: ['openFile'],
    });
    return result.canceled ? null : result.filePaths[0];
  });
}