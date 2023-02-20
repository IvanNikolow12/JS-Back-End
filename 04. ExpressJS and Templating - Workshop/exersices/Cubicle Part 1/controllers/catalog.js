module.exports = {
    catalog: async (req, res) => {
        const cubes = await req.storage.getAll(req.query);
        const context = {
            title: 'Cubicle',
            cubes,
            search: req.query.search || '',
            from: req.query.from || '',
            to: req.query.to || ''
        };

        res.render('index', context);
    }
};