const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { Client } = require('./client');

let client;

function createWindow() {
  console.log(12345);
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('connect-to-server', async (event, { ip, port }) => {
  console.log('🔌 Попытка подключения к', ip, port);
  try {
    client = new Client(ip, parseInt(port));
    console.log('✅ Клиент создан успешно');
    return true;
  } catch (error) {
    console.error('Ошибка подключения:', error.message);
    return false;
  }
});

ipcMain.handle('send-message-get-response', async (event, message) => {
  if (!client) {
    return 'Client not connected.';
  }
  return new Promise((resolve, reject) => {
    client.onceMessage((msg) => {
      resolve(msg);
    });
    client.send(message);
  });
});
