
const { app, BrowserWindow } = require("electron");

let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 1024,
        height: 768,
        //limit the size of the window lower and higher
        minWidth: 1024,
        minHeight: 768,
        maxWidth: 1024,
        maxHeight: 768,
        title: "Forja Cuentos",
        resizable: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    appWin.loadURL(`file://${__dirname}/dist/forja-cuentos/browser/index.html`);

    appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});
