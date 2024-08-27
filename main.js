const { app, BrowserWindow, ipcMain, session, Menu } = require('electron');
const path = require('node:path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight:750,
    minWidth: 350,
    //frame: false,    //hiding frame 
    //autoHideMenuBar: true,  // hide menu bar
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Preload script
      nodeIntegration: false,
      contextIsolation: true,
      //devTools: false    //disble dev tools 
      devTools: true    //disble dev tools 
    }
  });

  Menu.setApplicationMenu(null);

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
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
