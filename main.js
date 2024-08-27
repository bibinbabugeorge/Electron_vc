const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('node:path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //frame: false,    //hiding frame 
    //autoHideMenuBar: true,  // hide menu bar
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Preload script
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      //devTools: false    //disble dev tools 
    }
  });

  mainWindow.loadFile('index.html');
  //mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('set-cookie', (event, cookieDetails) => {
  session.defaultSession.cookies.set(cookieDetails, (error) => {
      if (error) {
          console.error('Error setting cookie:', error);
      } else {
          console.log('Cookie set successfully');
      }
  });
});

ipcMain.handle('get-cookies', async () => {
  const cookies = await session.defaultSession.cookies.get({});
  return cookies;
});

ipcMain.handle('get-sources', async () => {
  const { desktopCapturer } = require('electron');
  const sources = await desktopCapturer.getSources({ types: ['screen', 'window'] });
  return sources;
});