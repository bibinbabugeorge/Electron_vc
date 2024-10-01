const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('node:path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    show: false,
    //frame: false,    //hiding frame 
    autoHideMenuBar: true,  // hide menu bar
    webPreferences: {
      preload: path.join(__dirname, 'preload'), // Preload script
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false,
      //devTools: false    //disble dev tools 
    }
  });

  mainWindow.loadFile('splash.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  setTimeout(function () {
    mainWindow.loadFile('index.html');  // Load the main content
  }, 5000);  // Adjust the time as needed

  mainWindow.on('closed', () => {
    mainWindow = null;  // Dereference the window object on close
  });
}

// Ensure handlers are registered only once when the app starts
ipcMain.handle('capture-electron-page', async () => {
  const image = await mainWindow.capturePage();
  return image.toDataURL().split(',')[1]; // Send the image data as a PNG buffer
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
});

app.whenReady().then(createWindow);

// Handle macOS-specific behavior
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Recreate window if the app is clicked on the dock and no windows are open
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
