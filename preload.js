const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('api', {
  closeApp: () => ipcRenderer.invoke('close-app'),
  getUrl: () => 'http://localhost:8888',
  openBrowserWindow: (url) => ipcRenderer.invoke('open-browser-window', url),
  getSettings: () => ipcRenderer.invoke('settings:get'),
  saveSettings: (data) => ipcRenderer.invoke('settings:set', data),
});
