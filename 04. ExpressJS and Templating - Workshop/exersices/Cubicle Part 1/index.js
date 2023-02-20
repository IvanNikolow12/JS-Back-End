const express = require('express');
const hbs = require('express-handlebars');

const { init: storage } = require('./models/storage.js');

const { about } = require('./controllers/about');
const { catalog } = require('./controllers/catalog');
const { create, post: createPost } = require('./controllers/create');
const { details } = require('./controllers/details');
const { notFound } = require('./controllers/notFound');
const { edit, editPost } = require('./controllers/edit.js');

start();

async function start() {

    const app = express();
    const port = 3000;

    app.engine('hbs', hbs({
        extname: '.hbs',
    }));

    app.set('view engine', 'hbs');
    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: false }));
    app.use(await storage());

    app.get('/', catalog);
    app.get('/about', about);
    app.get('/details/:id', details)
    app.get('/create', create);
    app.post('/create', createPost);
    app.get('/edit/:id', edit)
    app.post('/edit/:id', editPost)

    app.all('*', notFound)

    app.listen(port, () => console.log(`Listening on port ${port}!`));
}