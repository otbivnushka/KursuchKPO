const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  closeApp: () => ipcRenderer.invoke('close-app'),
  connectToServer: (options) => ipcRenderer.invoke('connect-to-server', options),

  //selectDirectory: (pictureName) => ipcRenderer.invoke('dialog:selectDirectory', pictureName),
  //print: (sth) => ipcRenderer.invoke('print', sth),
  //convert_img: (blob, filename) => ipcRenderer.invoke('convert-to-img', blob, filename),
  //convert_blob: (filepath) => ipcRenderer.invoke('convert-to-blob', filepath),
  openBrowserWindow: (url) => ipcRenderer.invoke('open-browser-window', url),
  sendAndWaitResponse: (msgObj) => ipcRenderer.invoke('send-message-get-response', msgObj),
  getSettings: () => ipcRenderer.invoke('settings:get'),
  saveSettings: (data) => ipcRenderer.invoke('settings:set', data),
});
