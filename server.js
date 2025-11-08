const express = require('express');
const boydParser = require('body-parser');
require('dotenv').config();

const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(boydParser.json());
app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`🚀 Running on port ${port}`)});
    }
});