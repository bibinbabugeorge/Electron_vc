// Import required modules
const { app, BrowserWindow, ipcMain, session, Notification, Screen, Tray, Menu, nativeImage } = require('electron');
const path = require('node:path');
const { autoUpdater } = require('electron-updater');
require('dotenv').config({ path: path.join(__dirname, 'modules/.env') });

// Variables to hold window instances
let mainWindow;
let notificationWindow;
let tray = null;
let trayIcon = null;
// ---------------------Single instance -------------------------------//
// Single instance lock
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // If a second instance is opened, focus on the existing mainWindow
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}
// -------------------- Window Creation Functions -------------------- //

// Create the main window
function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'AppsConnect',
    width: 1030,
    height: 800,
    minHeight:768,
    minWidth:1024,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload'), // Preload script
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: false,
    }
  });

  mainWindow.loadFile('splash.html');
  //mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  setTimeout(() => {
    if (mainWindow) {
      mainWindow.loadFile('index.html');
    } else {
      console.error('Error: mainWindow is not initialized.');
    }
  }, 5000);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', async (event) => {
    event.preventDefault(); // Prevent the window from closing
    await appQuit('close'); // removing user from call if user closes window in ongoing call
    mainWindow.hide(); // Hide the window instead
  });

  autoUpdater.checkForUpdatesAndNotify();
}

// Create the notification window
function createNotificationWindow() {
  notificationWindow = new BrowserWindow({
    width: 300,
    height: 300,
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

  // Set a timeout to close the notification window after 30 seconds
  setTimeout(() => {
    if (notificationWindow) {
      notificationWindow.close(); // Close only if it's still valid
    }
  }, 27000); // 27 seconds
}


// -------------------- Tray Creation -------------------- //

function createTray() {
  if (tray === null) {
    if (process.platform === "darwin") {
      trayIcon = nativeImage.createFromPath(path.join(__dirname, 'assets/appsconnect_icon.png'));
      trayIcon = trayIcon.resize({ width: 16, height: 16 });
    } else {
      trayIcon = path.join(__dirname, 'assets/appsconnect_icon.png');
    }
    tray = new Tray(trayIcon)

    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show App',
        click: function () {
          if (!mainWindow) {
            createWindow();
          } else if (!mainWindow.isVisible()) {
            mainWindow.show();
          } else {
            mainWindow.focus(); // Bring the existing window to the front
          }
        }
      },
      {
        label: 'Quit',
        click: async function () {
          await appQuit('quit');
        }
      }
    ]);

    tray.setToolTip('AppsConnect');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
      if (process.platform == 'win32') {
        if (!mainWindow) {
          createWindow();
        } else if (!mainWindow.isVisible()) {
          mainWindow.show();
        } else {
          mainWindow.focus(); // Bring the existing window to the front
        }
      }
    });
  }
}

// -------------------- IPC and Event Listeners -------------------- //

// Handle setting a cookie
ipcMain.on('set-cookie', (event, cookieDetails) => {
  session.defaultSession.cookies.set(cookieDetails, (error) => {
    if (error) {
      console.error('Error setting cookie:', error);
    } else {
      console.log('Cookie set successfully');
    }
  });
});

// Handle getting cookies
ipcMain.handle('get-cookies', async () => {
  const cookies = await session.defaultSession.cookies.get({});
  return cookies;
});

// Handle getting desktop and window sources
ipcMain.handle('get-sources', async () => {
  const { desktopCapturer } = require('electron');
  const sources = await desktopCapturer.getSources({ types: ['screen', 'window'], thumbnailSize: { width: 854, height: 600 } });
  return sources.map(source => {
    source.thumbnailURL = source.thumbnail.toDataURL();
    return source;
  });
});

// Get operating system platform
ipcMain.handle('getOperatingSystem', async () => {
  const Os = await process.platform;
  return Os;
});

// Capture Electron window page
ipcMain.handle('capture-electron-page', async () => {
  const image = await mainWindow.capturePage();
  return image.toDataURL().split(',')[1];
});

// Handle showing notification
ipcMain.on('show-notification', (event, CallerDetails) => {
  if (!notificationWindow) {
    createNotificationWindow();

    // Load data into the notification window first, then show it
    notificationWindow.webContents.once('did-finish-load', () => {
      notificationWindow.webContents.send('update-notification', CallerDetails);
    });
    ipcMain.once('image-loaded', () => {
      notificationWindow.show();
    });
  } else {
    // If the notification window already exists, just update the data and show it
    notificationWindow.webContents.send('update-notification', CallerDetails);
    ipcMain.once('image-loaded', () => {
      notificationWindow.show();
    });
  }
});


ipcMain.on('show-notification-window', () => {
  notificationWindow.show();
  setTimeout(() => {
    if (notificationWindow) {
      notificationWindow.close(); // Close only if it's still valid
    }
  }, 29000); // 29 seconds
});



//show desktop notification for mac
ipcMain.on('show-desktop-notification', async (event, CallerDetails) => {
  const iconPath = path.join(__dirname, 'assets/appsconnect_icon.png'); // Your icon path
  const notification = new Notification({
    title: "AppsConnect", // Keep it empty to minimize the title display
    body: CallerDetails || "You have a new notification", // Default message
    icon: iconPath, // Your icon path
  });

  notification.show();

  // Optionally, handle notification clicks
  notification.on('click', () => {
    console.log('Notification clicked');
  });
});

// Handle notification response
ipcMain.on('notification-response', (event, response) => {
  if (response === 'reject') {
    mainWindow.webContents.send('notification-action', 'reject');
  } else if (response === 'audio') {
    mainWindow.webContents.send('notification-action', 'audio');
  } else if (response === 'video') {
    mainWindow.webContents.send('notification-action', 'video');
  }

  // Hide notification window after button click
  if (notificationWindow) {
    notificationWindow.hide();
  }
});

// Handle navigating to room
ipcMain.on('navigate-to-room', (event, roomType) => {
  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }
  mainWindow.show();
  mainWindow.focus();
  mainWindow.loadFile('confieranceroom.html');
});


// -------------------- App Lifecycle -------------------- //

app.setAppUserModelId("AppsConnect");
// Event: App ready
app.whenReady().then(async () => {
  await checkCookieExpiration();
  createWindow();
  createTray();
});

// Event: All windows closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Event: Recreate window if no windows are open
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow(); // Create window if no windows are open
  } else {
    // Show the main window if it's hidden or minimized
    if (mainWindow.isMinimized()) {
      mainWindow.restore(); // Restore if minimized
    } else if (!mainWindow.isVisible()) {
      mainWindow.show(); // Show if it's hidden
    }
    mainWindow.focus(); // Focus the window
  }
});


// Handle before quit
app.on('before-quit', async (event) => {
  event.preventDefault(); // Prevent the app from quitting immediately

  if (notificationWindow) {
    notificationWindow.close();
  }
  if (tray) {
    tray.destroy();
    tray = null;
  }

  await appQuit('quit'); // Ensure this doesn't cause a recursive call
});


// -------------------- Auto Updater Event Listeners -------------------- //

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

// -------------------- Other Functions -------------------- //

async function checkCookieExpiration() {
  const cookies = await session.defaultSession.cookies.get({});
  if (cookies.length === 0) return;  // Exit if no cookies found

  const cookie = cookies[0];
  const currentDate = new Date().toDateString();
  const expirationDate = new Date(cookie.expirationDate * 1000).toDateString();

  if (currentDate === expirationDate) {
    await session.defaultSession.clearStorageData({ storages: ['cookies'] });
  }
}

async function appQuit(type) {
  if (type === 'close' && mainWindow) {
    // Send the "stop-call" event to the renderer process (handled in conferenceroom.js)
    mainWindow.webContents.send('stop-call');

    ipcMain.once('call-stopped', () => {
      mainWindow.close(); // Quit the app once call-stopped is received
    });
  } else if (type === 'quit') {
    app.quit(); // Directly quit the app
  }
}

