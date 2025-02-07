require('dotenv').config({ path: __dirname + '/.env' });
const { app, BrowserWindow } = require("electron");

let appWin;

const createWindow = () => {
    appWin = new BrowserWindow({
        show: false,
        title: "Forja Cuentos",
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            devTools: true,
        }
    });

    appWin.once("ready-to-show", () => {
        appWin.maximize();
        appWin.show();
    });
    appWin.loadURL(process.env.APP_URL_LOCAL);

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
