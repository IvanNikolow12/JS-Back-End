const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const cats = require('../data/cats.json');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    const filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

    if (pathname === '/' && req.method === 'GET') {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 File NotFound');
                return;
            }
            const modifiedCats = cats.map((cat) => `
<li>
    <img src="${cat.image}" alt="${cat.name}">
    <h3>${cat.name}</h3>
    <p><span>Breed: </span>${cat.breed}</p>
    <p><span>Description: </span>${cat.description}</p>
    <ul class="buttons">
        <li class="btn edit"><a href="/cats/edit/${cat.id}">Change Info</a></li>
        <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
    </ul>
</li>`);

            const modifiedData = data.toString().replace('{{cats}}', modifiedCats);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(modifiedData);
            res.end();
        });
    }
    else if (pathname.includes('/search') && req.method == 'GET') {
        const searchQuery = qs.parse(req.url)['/search?search'].toLowerCase();
        const catsFound = cats.filter(cat => cat.name.toLowerCase().includes(searchQuery));
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('404 File NotFound');
                res.end();
                return;
            }

            const modifiedCats = catsFound.map(cat => `
            <li>
                <img src="${path.join(cat.image)}" alt="${cat.name}">
                <h3>${cat.name}</h3>
                <p><span>Breed: </span>${cat.breed}</p>
                <p><span>Description: </span>${cat.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                </ul>
            </li>
            `)

            const modifiedData = data.toString().replace('{{cats}}', modifiedCats);
            res.writeHead(200, { 'COntent-Type': 'text/html' });
            res.write(modifiedData);
            res.end();
        })
    } else {
        return true;
    }
}