import { app, BrowserWindow } from 'electron';
import { registerIpcHandlers } from './ipcHandlers';
import path from 'path';

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,  // 禁止渲染层直接使用 Node.js，防止 XSS 攻击获取系统权限
      contextIsolation: true,  // 隔离渲染层与 preload 的执行上下文，配合 contextBridge 使用
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // win.loadFile(path.join(__dirname, '../../src/renderer/index.html'));
  win.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(() => {
  registerIpcHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();  // macOS 上点击 Dock 图标时，若无窗口则重新创建
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});