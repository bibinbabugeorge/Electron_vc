const { contextBridge, ipcRenderer } = require('electron');
require('dotenv').config();  // Load environment variables

contextBridge.exposeInMainWorld('env', {
  Dev_url: process.env.Dev_url,
  CSC_LINK: process.env.CSC_LINK,
  CSC_KEY_PASSWORD: process.env.CSC_KEY_PASSWORD,
  APPLE_ID: process.env.APPLE_ID,
  APPLE_ID_PASSWORD: process.env.APPLE_ID_PASSWORD
});

contextBridge.exposeInMainWorld('electron', {
  conference: (url) => ipcRenderer.send('start-conference', url)
});

contextBridge.exposeInMainWorld('electronAPI', {
  setCookie: (cookieDetails) => ipcRenderer.send('set-cookie', cookieDetails),
  getCookies: () => ipcRenderer.invoke('get-cookies'),
  getSources: () => ipcRenderer.invoke('get-sources'),
  getOperatingSystem: () => ipcRenderer.invoke('getOperatingSystem'),
  captureElectronPage: () => ipcRenderer.invoke('capture-electron-page')
});