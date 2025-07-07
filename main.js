const path = require("path");
const { app, BrowserWindow, Menu } = require("electron");

const isDev = process.env.NODE_ENV !== "development";

const isMac = process.platform === "darwin";

// create main 'root' window
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Tutorial App",
    width: isDev ? 1500 : 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, "./gui/index.html"));
}

// create about window
function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    title: "About Tutorial App",
    width: 300,
    height: 500,
    resizable: false,
    autoHideMenuBar: true,
  });

  aboutWindow.loadFile(path.join(__dirname, "./gui/about.html"));
}

const menu = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click: app.quit,
        accelerator: "CmdOrCtrl+Q",
      },
    ],
  },
  {
    label: "Help",
    submenu: [
      {
        label: "About",
        click: createAboutWindow,
        accelerator: "CmdOrCtrl+A",
      },
    ],
  },
];

app.whenReady().then(() => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  app.on("activate"),
    () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
      }
    };
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
