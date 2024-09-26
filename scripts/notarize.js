const { notarize } = require('electron-notarize');

exports.default = async function notarizeApp(context) {
    debugger
  const { electronPlatformName, appOutDir } = context;

  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  console.log('Notarizing', appName);

  await notarize({
    appBundleId: 'com.appsteam.epicmeet',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: window.env.APPLE_ID,   // Set up your Apple Developer ID email as an environment variable
    appleIdPassword: window.env.APPLE_ID_PASSWORD // App-specific password for Apple ID
  });
};
