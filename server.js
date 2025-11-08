const express = require('express');
const boydParser = require('body-parser');
require('dotenv').config();

const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(boydParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`🚀 Running on port ${port}`)});
    }
});