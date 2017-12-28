import Storage from '@/storage';
const KEY = 'APP-CONFIG';
const cp = require('child_process');

let gogit;

export function Run() {
    return new Promise((resolve, reject) => {
        // 读取设置
        const config = Storage.get(KEY);

        if (!config) {
            return reject('配置数据为空');
        }

        if (config) {
            return reject('没有配置 gogs 运行路径');
        }

        const app_path = config.app_path;
        const port = config.port;

        gogit = cp.execFile(app_path, ['web', '--port', port], (err, stdout, stderr) => {
            if (err) {
                reject(err);
                console.error('Error', err);
            }
            else if (stderr) {
                reject(stderr);
                console.error('Stderr', stderr);
            }
            else {
                return resolve(gogit);
                console.log('Stdout', stdout);
            }
        });

        gogit.on('error', err => {
            resolve(err);
            console.error(err)
        });
    });
}

export function Kill() {
    return new Promise((resolve, reject) => {
        if (gogit) {
            try {
                gogit.kill();
                gogit = undefined;
                resolve();
            }
            catch (err) {
                return reject(err);
            }
        }
    });
}


