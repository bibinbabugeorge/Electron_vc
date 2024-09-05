const { app, BrowserWindow, ipcMain, session, Menu } = require('electron');
const path = require('node:path');


Menu.setApplicationMenu(null);

function createWindow() {
  const mainWindow = new BrowserWindow({
    icon: './assets/group_icon.ico',
    height: 800,
    width : 800,
    show: false,
    //frame: false,    //hiding frame 
    //autoHideMenuBar: true,  // hide menu bar
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Preload script
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false,
      //devTools: false    //disble dev tools 
      devTools: true    //disble dev tools 
    }
  });

  Menu.setApplicationMenu(null);

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.loadFile('splash.html');
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  //mainWindow.webContents.openDevTools();
  setTimeout(function () {
    mainWindow.loadFile('index.html');  // Load the main content
  }, 5000);  // Adjust the time as needed
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
  const sources = await desktopCapturer.getSources({ types: ['screen', 'window'], thumbnailSize: { width: 854, height: 600 } });
  return sources.map(source => {
    source.thumbnailURL = source.thumbnail.toDataURL();
    return source;
  });
});

ipcMain.handle('getOperatingSystem', async () => {
  const Os = await process.platform;
  return Os;
})