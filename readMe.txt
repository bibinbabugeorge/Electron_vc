
=========================================================================
Following are the important notes on maintaining the electron build of VC
=========================================================================

* Incase of a Development server change, change the server link in the .env file under modules folder (modules\.env)

* Incase of application name change, search for `AppsConnect` in main.js and replace it with the new application name

* If icons,images reffered in main.js is changed, update the path accordingly

* File uploads are stored under uploads folder. In any event of file upload folder change, change `fileUploadPath` variable in the index.js

* Screen recording and screen sharing are custom written for electron, Incase of a framework change this need to be addressed 
