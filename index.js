/* eslint-disable-next-line */
const { app, BrowserWindow } = require("electron");

function createWindow() {
    const window = new BrowserWindow({ width: 800, height: 600});

    window.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);
