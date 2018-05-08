const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(express.json());

const watchController = require('./controllers/watch-controller.js');
app.use('/timepiece', watchController);

const mongoURI= process.env.MONGODB_URI || 'mongodb://localhost:27017/timepiece';
mongoose.connect(mongoURI)
mongoose.connection.once('open', ()=> {
    console.log('The God is listening');
})
app.listen(port, ()=> {
    console.log('Terminal is listening');
})
