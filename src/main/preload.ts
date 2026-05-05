import { contextBridge, ipcRenderer } from 'electron';
import { Game } from '../types/game';

// 通过 contextBridge 向渲染层暴露受控接口
contextBridge.exposeInMainWorld('electronAPI', {
    getGames: () => ipcRenderer.invoke('games:getAll'),
    saveGame: (game: Game) => ipcRenderer.invoke('games:save', game),
    deleteGame: (id: string) => ipcRenderer.invoke('games:delete', id),
    launchGame: (exePath: string) => ipcRenderer.invoke('game:launch', exePath),
    selectExeFile: () => ipcRenderer.invoke('dialog:selectExe'),  // 文件选择依赖 Electron 原生对话框，只有主进程能调用，因此通过 IPC 转发
    selectImageFile: () => ipcRenderer.invoke('dialog:selectImage'),
});