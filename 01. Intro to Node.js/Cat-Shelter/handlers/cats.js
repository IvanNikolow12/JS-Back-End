const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const path = require('path');
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');

module.exports = (req, res) => {

    const pathname = url.parse(req.url).pathname;

    if (pathname == '/cats/add-cat' && req.method == 'GET') {
        const filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'COntent-Type': 'text/plain' });
                res.write('File NotFound');
                res.end();
                return;
            }
            const breedsPlaceholder = breeds.map(breed => `<option value="${breed}">${breed}</option>`)
            const modifiedData = data.toString().replace('{{breeds}}', breedsPlaceholder)
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(modifiedData);
            res.end();
        })
    } else if (pathname == '/cats/add-breed' && req.method == 'GET') {
        const filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('File NotFound');
                res.end();
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        })
    } else if (pathname == '/cats/add-breed' && req.method == 'POST') {
        let formData = '';
        req.on('data', data => {
            formData += data;
        });

        req.on('end', () => {
            const body = qs.parse(formData);
            fs.readFile('./data/breeds.json', (err, data) =>{
                console.log(data);
                if(err){
                    throw err;
                }
                let breeds = JSON.parse(data);
                breeds.push(body.breed);

                fs.writeFile('../data/breed.json', JSON, () => {
                    console.log(`${body.breed} was added successfully to the breeds.`);
                })
            });
        });


    } else if (pathname.includes('/cats/edit') && req.method == 'GET') {
        const filePath = path.normalize(path.join(__dirname, '../views/editCat.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, 'File NotFound');
                res.write('File NotFound');
                res.end();
            }

            const id = pathname.split('/').pop();
            const cat = cats.find(cat => cat.id == id)

            res.writeHead(200, { 'Content-Type': "text/html" });
            res.write(data);
            res.end();

        });
    }

}