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

const STATIC = (p) => path.join(__dirname, '../../static', p);

let mainWindow;
let appIcon;
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 480,
        width: 320 + 400,
        useContentSize: true,
        frame: false,                   // 边框
        transparent: true,              // 背景透明
        icon: STATIC('icons/icon.ico'),
        title: 'GoGit 服务管理工具',
    });

    mainWindow.loadURL(winURL);
    mainWindow.setMenu(null);

    mainWindow.on('closed', () => {
        mainWindow = null
    });

    // 托盘图标
    appIcon = new Tray(STATIC('icons/icon.ico'));
    appIcon.setToolTip('GoGit 服务管理工具');
    appIcon.on('click', event => {
        // 显示窗口并获取焦点
        mainWindow.show();
    });
    appIcon.setContextMenu(Menu.buildFromTemplate([
        {
            label: '打开', type: 'normal', click() {
                mainWindow.show();
            }
        },
        {
            label: '退出', type: 'normal', role: 'close', click() {
                mainWindow.close();
            }
        },
    ]));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// 窗口隐藏
ipcMain.on('#window-hide', () => {
    mainWindow.hide();
});

