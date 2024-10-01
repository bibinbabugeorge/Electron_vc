const { app, BrowserWindow, ipcMain, session, Notification, Screen } = require('electron');
const path = require('node:path');
const { autoUpdater } = require('electron-updater'); // Import electron-updater

let mainWindow;
let notificationWindow;

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

  // Check for updates after the window has been created
  autoUpdater.checkForUpdatesAndNotify();
}

function createNotificationWindow() {
  notificationWindow = new BrowserWindow({
    width: 265,
    height: 265,  // Set exact height for proper content display
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    skipTaskbar: true,
    //resizable: false,  // Prevent window resizing
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Load the preload script
      nodeIntegration: false,  // For security reasons
      contextIsolation: true,  // Ensure context isolation
      devTools: true
    }
  });

  notificationWindow.loadFile('notification.html');
  notificationWindow.webContents.openDevTools();

  notificationWindow.on('closed', () => {
    notificationWindow = null;
  });
}

// Ensure handlers are registered only once when the app starts
ipcMain.handle('capture-electron-page', async () => {
  const image = await mainWindow.capturePage();
  return image.toDataURL().split(',')[1];
}); // Send the image data as a PNG buffer

// Auto Updater event listeners
autoUpdater.on('update-available', () => {
  console.log('Update available.');
  // You can add code to notify the user about the update
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded; will install now');
  // Automatically install and restart the app
  autoUpdater.quitAndInstall();
});

autoUpdater.on('error', (error) => {
  console.error('Update error:', error);
});


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
});

app.whenReady().then(createWindow);

// Handle macOS-specific behavior
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
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
