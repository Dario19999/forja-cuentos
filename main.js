require('dotenv').config({ path: __dirname + '/.env' });
const { app, BrowserWindow } = require("electron");

let appWin;

const createWindow = () => {
    app.commandLine.appendSwitch('disable-features', 'SameSiteByDefaultCookies');

    appWin = new BrowserWindow({
        show: false,
        title: "Forja Cuentos",
        webPreferences: {
            webSecurity: false,
            contextIsolation: true,
            nodeIntegration: true,
            devTools: process.env.APP_ENV === "dev",
        }
    });

    appWin.once("ready-to-show", () => {
        appWin.maximize();
        appWin.show();
    });

    if(process.env.APP_ENV === "dev") {
        appWin.loadURL(process.env.APP_URL_LOCAL);
    }
    else if (process.env.APP_ENV === "prod") {
        appWin.loadFile(process.env.APP_URL_DIST);
    }

    appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });

}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
