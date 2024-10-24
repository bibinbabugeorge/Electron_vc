const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  conference: (url) => ipcRenderer.send('start-conference', url)
});

// for ipc handler and renderer communication
contextBridge.exposeInMainWorld('electronAPI', {
  setCookie: (cookieDetails) => ipcRenderer.send('set-cookie', cookieDetails),
  getCookies: () => ipcRenderer.invoke('get-cookies'),
  getSources: () => ipcRenderer.invoke('get-sources'),
  getOperatingSystem: () => ipcRenderer.invoke('getOperatingSystem'),
  captureElectronPage: () => ipcRenderer.invoke('capture-electron-page'),
  onNotificationAction: (callback) => ipcRenderer.on('notification-action', (event, action) => callback(action)),
  sendResponse: (response) => ipcRenderer.send('notification-response', response),
  showNotification: (CallerDetails) => ipcRenderer.send('show-notification', CallerDetails),
  showDesktopNotification: (CallerDetails) => ipcRenderer.send('show-desktop-notification', CallerDetails),
  closeNotificationWindow: () => ipcRenderer.send('close-notification-window'),

  onStopCall: (callback) => ipcRenderer.on('stop-call', callback),
  sendCallStopped: () => ipcRenderer.send('call-stopped'),

  receive: (channel, func) => {
    const validChannels = ['update-notification'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  send: (channel, data) => ipcRenderer.send(channel, data),
  onTrackAction: (userId, type) => ipcRenderer.send('track-action', userId, type),
  //onTrackAction: (callback) => ipcRenderer.on('track-action', (event, action) => callback(action)),
  UpdateTrackreceive: (channel, func) => {
    const validChannels = ['update-track'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  RemoveTrackreceive: (channel, func) => {
    const validChannels = ['remove-track'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});

// Loading enviornmental variables form env file
contextBridge.exposeInMainWorld('env', {
  Server_Url: process.env.Server_Url
});