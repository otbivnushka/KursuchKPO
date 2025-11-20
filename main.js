const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { Client } = require('./client');

let client;
let settingsPath;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 350,
    minHeight: 480,
    icon: path.join(__dirname, 'src', 'assets', 'icon.png'),
    autoHideMenuBar: true,
    title: 'Dictionary',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:3000');
}

function createBrowserWindow(url) {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    icon: path.join(__dirname, 'src', 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL(url);
}

app.whenReady().then(() => {
  settingsPath = path.join(app.getPath('userData'), 'settings.json');

  if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(
      settingsPath,
      JSON.stringify(
        {
          theme: 'light',
          lang: 'en',
        },
        null,
        2
      )
    );
  }

  createWindow();
  ipcMain.handle('open-browser-window', (event, url) => {
    createBrowserWindow(url);
  });
});

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

ipcMain.handle('send-message-get-response', async (event, messageObj) => {
  if (!client) {
    return { error: 'Client not connected' };
  }

  return new Promise((resolve) => {
    client.onceMessage((response) => {
      resolve(response);
    });

    client.sendJson(messageObj);
  });
});

ipcMain.handle('settings:get', async () => {
  const data = fs.readFileSync(settingsPath, 'utf8');
  return JSON.parse(data);
});

// Запись
ipcMain.handle('settings:set', async (event, newSettings) => {
  fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2));
  return true;
});
