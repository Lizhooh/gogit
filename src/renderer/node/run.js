import Storage from '@/storage';
const KEY = 'APP-CONFIG';
const cp = require('child_process');
const os = require('os');

function ip() {
    const network = os.networkInterfaces();
    const list = network[Object.keys(network).filter(i => !/Loopback/.test(i))[0]];
    return list.filter(i => i.family === 'IPv4')[0];
}

let gogit;

export function Run() {
    return new Promise((resolve, reject) => {
        // 读取设置
        const config = Storage.get(KEY);

        if (!config) {
            return reject('配置数据为空');
        }

        if (!config.path) {
            return reject('没有配置 gogs 运行路径');
        }

        const path = config.path;
        const port = config.port;

        // 启动进程
        gogit = cp.execFile(path, ['web', '--port', port], (err, stdout, stderr) => {
            if (err) {
                reject(`查看端口（${port}）是否被占用`);
            }
            else if (stderr) {
                reject('gogs 运行错误');
            }
            console.log(stdout);
        });

        gogit.on('error', err => {
            reject('Nodejs 进程运行错误');
        });

        gogit.on('close', _ => {
            reject(`查看端口（${port}）是否被占用`);
        });

        gogit.on('disconnent', _ => {
            reject('Gogit 断开连接了');
        });

        gogit.on('connent', _ => {
            resolve(`${ip().address}:${port}`);
        });

        setTimeout(() => {
            resolve(`${ip().address}:${port}`);
        }, 500);
    });
}

export function Kill() {
    return new Promise((resolve, reject) => {
        if (gogit) {
            try {
                gogit.kill();
                gogit = undefined;
                resolve('kill');
            }
            catch (err) {
                return reject(err);
            }
        }
    });
}


