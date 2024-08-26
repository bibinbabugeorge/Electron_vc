const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  conference: (url) => ipcRenderer.send('start-conference', url)
});

// contextBridge.exposeInMainWorld('electronAPI', {
//   setCookie: (cookieDetails) => ipcRenderer.send('set-cookie', cookieDetails),
//   getCookies: () => ipcRenderer.invoke('get-cookies')
// });

contextBridge.exposeInMainWorld('electronAPI', {
  setCookie: (cookieDetails) => ipcRenderer.send('set-cookie', cookieDetails),
  getCookies: () => ipcRenderer.invoke('get-cookies')
});