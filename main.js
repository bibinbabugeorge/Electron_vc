const { app, BrowserWindow, ipcMain, session, Notification, Screen, Tray, Menu } = require('electron');
const path = require('node:path');
const { autoUpdater } = require('electron-updater');
require('dotenv').config({ path: path.join(__dirname, 'modules/.env') });

let mainWindow;
let notificationWindow;
let tray = null;

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
      //devTools: false    //disable dev tools 
    }
  });

  mainWindow.loadFile('splash.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  setTimeout(function () {
    mainWindow.loadFile('index.html');
  }, 5000);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.on('close', (event) => {
    event.preventDefault(); // Prevent the window from closing
    mainWindow.hide(); // Hide the window instead
  });

  autoUpdater.checkForUpdatesAndNotify();
}

function createNotificationWindow() {
  notificationWindow = new BrowserWindow({
    width: 265,
    height: 265,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      devTools: true
    }
  });

  notificationWindow.loadFile('notification.html');
  notificationWindow.on('closed', () => {
    notificationWindow = null;
  });
}

function createTray() {
  // Ensure that the tray is created only once
  if (tray === null) {
    tray = new Tray(path.join(__dirname, 'assets/appsconnect_icon.png'));

    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show App',
        click: function () {
          if (!mainWindow) {
            createWindow();
          } else {
            mainWindow.show();
            mainWindow.loadFile('dashboard.html');
          }
        }
      },
      {
        label: 'Quit',
        click: function () {
          app.quit();
        }
      }
    ]);

    tray.setToolTip('AppsConnect');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
      if (!mainWindow) {
        createWindow();
      } else {
        mainWindow.show();
        mainWindow.loadFile('dashboard.html');
      }
    });
  }
}
app.on('before-quit', () => {
  if (notificationWindow) {
    notificationWindow.close(); // Close the notification window if it's open
  }
  if (tray) {
    tray.destroy(); // Destroy the tray icon
    tray = null;
  }
});
// Auto Updater event listeners
autoUpdater.on('update-available', () => {
  console.log('Update available.');
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded; will install now');
  autoUpdater.quitAndInstall();
});

autoUpdater.on('error', (error) => {
  console.error('Update error:', error);
});

app.whenReady().then(() => {
  createWindow();
  createTray(); // Call tray creation only once after app is ready
});

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
});

// Ensure handlers are registered only once when the app starts
ipcMain.handle('capture-electron-page', async () => {
  const image = await mainWindow.capturePage();
  return image.toDataURL().split(',')[1];
});

// Handle notification actions from the notification window
ipcMain.on('show-notification', (event, CallerDetails) => {
  if (!notificationWindow) {
    createNotificationWindow();
  } else {
    notificationWindow.show();
  }
  notificationWindow.webContents.send('update-notification', CallerDetails);
});

// Handle the notification response
ipcMain.on('notification-response', (event, response) => {
  if (response === 'reject') {
    mainWindow.webContents.send('notification-action', 'reject');
  } else if (response === 'audio') {
    mainWindow.webContents.send('notification-action', 'audio');
  } else if (response === 'video') {
    mainWindow.webContents.send('notification-action', 'video');
  }

  // Hide the notification window after button click
  if (notificationWindow) {
    notificationWindow.hide();
  }
});

// Recreate window if the app is clicked on the dock and no windows are open
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
