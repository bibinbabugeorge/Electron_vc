The packaging and installer is done using `electron-builder`

* Install electron-builder
    -> npm install --save-dev electron-builder

* Configure the package.json
    -> (eg)

        "build": {
    "appId": "com.yourname.vc",
    "productName": "EpicMeet",
    "files": [
      "dist/**/*",
      "node_modules/**/*",
      "main.js",
      "package.json"
    ],
    "win": {
      "target": "nsis",
      "icon": "path/to/icon.ico"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "license": "path/to/LICENSE.txt",
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true
    }
  }

* Package the application
    -> npm run dist


