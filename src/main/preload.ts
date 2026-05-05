import { contextBridge, ipcRenderer } from 'electron';

// 通过 contextBridge 向渲染层暴露受控接口。
contextBridge.exposeInMainWorld('electronAPI', {
  getConfigs: () => ipcRenderer.invoke('configs:getAll'),
  saveConfig: (id: string, exePath: string) => ipcRenderer.invoke('configs:save', id, exePath),
  launchGame: (exePath: string) => ipcRenderer.invoke('game:launch', exePath),
  selectExeFile: () => ipcRenderer.invoke('dialog:selectExe'),  // 文件选择依赖 Electron 原生对话框，只有主进程能调用，因此通过 IPC 转发
});