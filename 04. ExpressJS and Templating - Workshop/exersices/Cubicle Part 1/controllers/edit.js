module.exports = {
    edit: async (req, res) => {
        const cube = await req.storage.getById(req.params.id);
        cube[`select${cube.difficulty}`] = true;

        if (!cube) {
            res.redirect('404');
        } else {
            const context = {
                title: 'Edit Cube',
                cube,
                id: req.params.id
            }

            res.render('edit', context);
        }

    },
    editPost: async (req, res) => {
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: Number(req.body.difficulty)
        };

        console.log(cube);

        try {
            await req.storage.edit(req.params.id, cube);
            res.redirect('/');
        } catch (err) {
            res.redirect('404');
        }
    }
}