
// 读取设置
const app_path = '';
const port = 5000;

const cp = require('child_process');

const gogit = cp.execFile('gogs.exe', ['web', '--port', "5000"], (err, stdout, stderr) => {
    console.log(err, stdout, stderr);
});


gogit.on('error', err => console.error(err));

