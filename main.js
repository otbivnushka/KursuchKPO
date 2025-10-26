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

ipcMain.handle('close-app', () => {
  app.quit();
});

ipcMain.handle('connect-to-server', async (event, { ip, port }) => {
  try {
    client = new Client(ip, port);
    await client.connect(5000); // ждёт 5 секунд максимум
    return { success: true };
  } catch (error) {
    console.error('Ошибка подключения:', error.message);
    return { success: false, error: error.message };
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
