// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express'); // import the express package

const server = express(); // creates the server

server.use(express.json());

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
    res.send('Hello from Express');
});

// C - Create
server.post('/api/posts', (req, res) => {
    const newPost = req.body;

    // console.log(newPost)

    db
        .insert(newPost)
        .then(result => {
            db
                .findById(result.id)
                .then(post => {
                    res.status(201).json(post);
                })
                .catch(err => res.status(500).json({
                    message: 'Id was not attached to new note',
                    error: err
                }))
        })
        .catch(err => res.status(500).json({
            message: 'New Post Creation Failed',
            error: err
        }));
});

// Ra - Read All
server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            posts ?
                res.status(200).json(posts)
            :
                res.status(404).json({
                    message: "Posts not Found"
                })
        })
        .catch(err => res.status(500).json(err));
});

// R - Read
server.get('/api/posts/:id', async (req, res) => {
    const id = req.params.id;

    // db
    //     .findById(id)
    //     .then(post => {
    //         console.log(post)
    //         post.length > 0 ?
    //             res.status(200).json(post)
    //             :
    //             res.status(404).json({
    //                 message: `No post with id: ${id}`
    //             });
    //     })
    //     .catch(err => res.status(500).json(err));
    
    try {
        post = await db.findById(id);

        post.length > 0 ?
            res.status(200).json(post)
            :
            res.status(400).json({
            message: `No post with id: ${id}`
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

// U - Update
server.put('/api/posts/:id', async (req, res) => {
    const id = req.params.id;
    const updatedPost = req.body;

    try {
        const result = await db.update(id, updatedPost);

        const post = await db.findById(result);

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// D - Delete

// watch for connections on port 5000
server.listen(5000, () =>
    console.log('Server running on http://localhost:5000')
);