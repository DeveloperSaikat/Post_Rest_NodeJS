const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feeds');
const authRoutes = require('./routes/auth');
const { error } = require('console');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    })

})

mongoose.connect(
    'mongodb+srv://saikatdevworks:cJQjt0HhOoxexSf6@test-cluster.kfa5qnw.mongodb.net/post?w=majority'
)
.then(res => {
    app.listen(8080);
})
.catch(err => {
    console.log(err);
})

