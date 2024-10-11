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

// -------------------- Window Creation Functions -------------------- //

// Create the main window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
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
    notificationWindow.once('ready-to-show', () => {
      notificationWindow.webContents.send('update-notification', CallerDetails);
    });
  } else {
    notificationWindow.webContents.send('update-notification', CallerDetails);
  }
});

ipcMain.on('show-notification-window', () => {
  if (notificationWindow) {
    notificationWindow.show();
  }
});


//show desktop notification for mac
ipcMain.on('show-desktop-notification', async (event, CallerDetails) => {
  const iconPath = path.join(__dirname, 'assets/appsconnect_icon.png'); // Your icon path
  const notification = new Notification({
    title: "", // Keep it empty to minimize the title display
    body: CallerDetails.message || "You have a new notification", // Default message
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

  // Close notification window if it exists
  if (notificationWindow) {
    notificationWindow.close();
  }

  // Destroy the tray if it exists
  if (tray) {
    tray.destroy();
    tray = null;
  }

  // Ensure the call is stopped before quitting the app
  if (mainWindow) {
    // Send the "stop-call" event to the renderer process (handled in conferenceroom.js)
    mainWindow.webContents.send('stop-call');

    // Wait for confirmation from the renderer process that the call has ended
    ipcMain.once('call-stopped', () => {
      // Once confirmed, quit the app
      app.quit();
    });
  } else {
    // If no mainWindow, quit immediately
    app.quit();
  }
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
