// Import required modules
const { app, BrowserWindow, ipcMain, session, Notification, Screen, Tray, Menu, nativeImage } = require('electron');
const path = require('node:path');
const { autoUpdater } = require('electron-updater');
require('dotenv').config({ path: path.join(__dirname, 'modules/.env') });
const fs = require('fs');
const axios = require('axios');
const https = require('https');

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
          } else if (!mainWindow.isVisible()) {
            mainWindow.show();
          } else {
            mainWindow.focus(); // Bring the existing window to the front
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
// ipcMain.on('show-notification', (event, CallerDetails) => {
//   if (!notificationWindow) {
//     notificationWindow.webContents.send('update-notification', CallerDetails);
//     notificationWindow.once('ready-to-show', () => {
//       createNotificationWindow();
//     });
//   } else {
//     notificationWindow.webContents.send('update-notification', CallerDetails);
//   }
// });

ipcMain.on('show-notification', (event, CallerDetails) => {
  if (!notificationWindow) {
    CallerDetails.profilePic = app.getPath('userData') + '/cache/' + CallerDetails.profilePic;
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
  }, 15000); // 15 seconds
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

// ipcMain.handle('cache-images', async (event, images) => {
//   const result = await cacheImage(images);
//   return result;
// });

ipcMain.handle('get-app-path', async () => {
  const appPath = app.getPath('userData');
  return appPath; // Return the application path
});

ipcMain.handle('cache-images', async (event, imageUrls) => {
  const result = await cacheImage(imageUrls, event.sender);
  return result;
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
app.on('before-quit', () => {
  if (notificationWindow) {
    notificationWindow.close();
  }
  if (tray) {
    tray.destroy();
    tray = null;
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

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false // Ignore SSL certificate verification
  })
});

// const cacheImage = async (imageUrls) => {
//   const cachePath = app.getPath('userData');
//   const cacheDir = path.join(cachePath, 'cache');

//   if (!fs.existsSync(cacheDir)) {
//     fs.mkdirSync(cacheDir);
//   }
//   try {
//     for (const imageUrl of imageUrls) {
//       try {
//         const apiUri = process.env.Server_Url;
//         const imageName = path.basename(imageUrl);
//         const filePath = path.join(cacheDir, imageName);

//         if (fs.existsSync(filePath)) {
//           continue; // Image already cached
//         }

//         // Download the image using axios with the custom agent
//         const response = await axiosInstance({
//           url: `${apiUri}uploads/${imageUrl}`,
//           method: 'GET',
//           responseType: 'stream',
//         });

//         const writer = fs.createWriteStream(filePath);
//         response.data.pipe(writer);

//         await new Promise((resolve, reject) => {
//           writer.on('finish', resolve);
//           writer.on('error', reject);
//         });

//       } catch (error) {
//         console.error(`Error downloading image: ${error.message}`);
//         throw error;
//       }
//     }
//     return "success"
//   } catch {
//     return "fail"
//   }
// }

const cacheImage = async (imageUrls, webContents) => {
  const cachePath = app.getPath('userData');
  const cacheDir = path.join(cachePath, 'cache');

  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];
    try {
      const apiUri = process.env.Server_Url;
      
      // Use URL object to handle image names safely
      const imageUrlObject = new URL(imageUrl, apiUri);
      const imageName = path.basename(imageUrlObject.pathname);
      const filePath = path.join(cacheDir, imageName);

      if (fs.existsSync(filePath)) {
        webContents.send('image-cached', { imageUrl, filePath });
        continue; // Image already cached
      }

      const response = await axiosInstance({
        url: `${apiUri}uploads/${imageUrl}`,
        method: 'GET',
        responseType: 'stream',
      });
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', () => {
          webContents.send('image-cached', { imageUrl, filePath });
          webContents.send('store-image-path', { imageUrl, filePath });
          resolve();
        });
        writer.on('error', reject);
      });

    } catch (error) {
      console.error(`Error downloading image: ${error.message}`);
    }
  }

  return "success";
};
