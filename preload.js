const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  conference: (url) => ipcRenderer.send('start-conference', url)
});

