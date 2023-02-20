const fs = require('fs');
const url = require('url');

function getContentType(url) {
    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('ico')) {
        return 'image/x-icon';
    } else if (url.endsWith('jpg')) {
        return 'image/jpg';
    } else if (url.endsWith('jpeg')) {
        return 'image/jpeg';
    } else if (url.endsWith('png')) {
        return 'image/png';
    } else {
        return true;
    }
}

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname.replace('/cats', '');
    console.log(pathname);
    if (pathname.startsWith('/content') && req.method == 'GET') {
        if (pathname.endsWith('ico') || pathname.endsWith('jpg') || pathname.endsWith('jpeg') || pathname.endsWith('npg')) {
            fs.readFile(`./${pathname}`, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write('404 File NotFound');
                    res.end();
                    return;
                }

                res.writeHead(200, { 'Content-Type': getContentType(pathname) });
                res.write(data);
                res.end();
            });
        } else {
            fs.readFile(`./${pathname}`, 'utf-8', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plan' });
                    res.write('404 File NotFound');
                    res.end();
                    return;
                }

                res.writeHead(200, { 'Content-Type': getContentType(pathname) });
                res.write(data);
                res.end();
            });
        }
    } else {
        return true;
    }
}