import { ipcMain, dialog, BrowserWindow } from 'electron';
import { spawn } from 'child_process';
import { getConfigs, saveGameConfig } from './store';

export function registerIpcHandlers(): void {
  ipcMain.handle('configs:getAll', () => {
    return getConfigs();
  });

  ipcMain.handle('configs:save', (_event, id: string, exePath: string) => {
    return saveGameConfig(id, exePath);
  });

  ipcMain.handle('game:launch', (_event, exePath: string) => {
    const child = spawn(exePath, [], {
      detached: true,
      stdio: 'ignore',
    });
    child.unref();
  });

  ipcMain.handle('dialog:selectExe', async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const result = await dialog.showOpenDialog(win!, {
      title: '选择游戏可执行文件',
      filters: [{ name: '可执行文件', extensions: ['exe'] }],
      properties: ['openFile'],
    });
    return result.canceled ? null : result.filePaths[0];
  });
}