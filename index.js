const {save, load, add} = require('./user');

// same as:
// const FileDb = require('./user);
// const save = FileDb.save
// const load = FileDb.load
// const add = FileDb.add

const express = require('express');
const app = express();
const port = 3000;

app.get('/ping', (req, res) => {
    res.json({'message': 'pong'})
});

app.get('/classlist/add', (req, res) => {
    
    const {query} = req;
    // const query = req.query

    const {name, age} = query;
    // const name = query.name
    // const age = query.age
    // const {name, age} = req.query;
    console.log(name, age)
    add({name, age}, (err, data) => {
        if (err) {
            res.status(500)
            res.json({
                'message': "something went wrong!",
                "err": err,
            });
            return;
        }

        res.json({
            "message": "success",
        });
    })
    

});

app.get('/classlist/clear', (req, res) => {
    save([], (err, data) => {
        if (err) {
            res.status(500)
            res.json({
                'message': "something went wrong!",
                "err": err,
            });
            return;
        }

        res.json({
            "message": "success",
        });

    })
});

app.get('/classlist/load', (req, res) => {
    load((err, data) => {
        if (err) {
            res.status(500)
            res.json({
                'message': "something went wrong!",
                "err": err,
            });
            return;
        }

        res.json({
            "message": "success",
            data,
        });

    })
})

app.listen(port, () => {
    console.log(`listening at port ${port}`)
});