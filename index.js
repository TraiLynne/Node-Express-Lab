// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express'); // import the express package

const server = express(); // creates the server

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
    res.send('Hello from Express');
});

// C - Create

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

// U - Update

// D - Delete

// watch for connections on port 5000
server.listen(5000, () =>
    console.log('Server running on http://localhost:5000')
);