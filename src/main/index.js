import {
    app,
    BrowserWindow,
    ipcMain,
    Tray,
    Menu,
} from 'electron'

const path = require('path');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const STATIC = (p) => path.join(__static, p);

let win;
let appIcon;
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
    /**
     * Initial window options
     */
    win = new BrowserWindow({
        height: 480,
        width: 320,
        maxWidth: 320,
        maxHeight: 480,
        resizable: false,
        useContentSize: true,
        frame: false,                   // 边框
        transparent: true,              // 背景透明
        show: false,
        title: 'GoGit 服务管理工具',
    });

    const logo = STATIC('logo.png');

    win.loadURL(winURL);
    win.setMenu(null);
    win.setIcon(logo);
    win.setOverlayIcon(logo, 'GoGit 服务管理工具');
    win.setThumbnailToolTip('GoGit 服务管理工具');

    win.on('closed', () => win = null);
    win.once('ready-to-show', () => win.show());

    // 托盘图标
    appIcon = new Tray(logo);
    appIcon.setToolTip('GoGit 服务管理工具');
    appIcon.on('double-click', event => win.show());
    appIcon.setContextMenu(Menu.buildFromTemplate([
        { label: '打开', type: 'normal', click() { win.show() } },
        { label: '退出', type: 'normal', role: 'close', click() { win.close() } },
    ]));
}

app.setJumpList(null);
app.clearRecentDocuments();
app.setAppUserModelId('GoGit');

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

// 窗口隐藏
ipcMain.on('#window-hide', () => {
    win.hide();
});

// 保证只运行一个窗口
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    if (win) {
        if (win.isMinimized()) win.restore();
        win.focus();
    }
});

if (shouldQuit) {
    app.quit();
}
