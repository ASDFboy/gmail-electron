const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const GMAIL_URL = 'https://mail.google.com/mail/u/0/';

// Google blocks sign-in from browsers it can't recognize (including the
// default Electron user agent), so we present as a normal desktop Chrome.
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

// Use icon.png if it exists in the project folder; otherwise fall back to
// Electron's default icon. Drop your own icon.png / icon.ico / icon.icns
// next to main.js before packaging to brand the app yourself.
const ICON_PATH = path.join(__dirname, 'icon.png');
const hasCustomIcon = fs.existsSync(ICON_PATH);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 480,
    minHeight: 400,
    title: 'Gmail',
    backgroundColor: '#ffffff',
    autoHideMenuBar: true,
    ...(hasCustomIcon ? { icon: ICON_PATH } : {}),
    webPreferences: {
      partition: 'persist:gmail',
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true,
    },
  });

  mainWindow.webContents.setUserAgent(USER_AGENT);
  mainWindow.loadURL(GMAIL_URL);

  mainWindow.on('page-title-updated', (event) => {
    event.preventDefault();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.includes('google.com') || url.includes('gmail.com')) {
      return { action: 'allow' };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function buildMenu() {
  const template = [
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { role: 'toggleDevTools' },
      ],
    },
    {
      label: 'Window',
      submenu: [{ role: 'minimize' }, { role: 'close' }],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  buildMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
