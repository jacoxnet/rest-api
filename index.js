const express = require('express');
const users = require('./users.json');

const app = express();

app.get('/', function(req, res) {
    res.send('Hello World');
});

app.get('/books', (req, res) => {
    res.send('there are 4 books in store');
});

app.post('/', (req, res) => {
    res.send('this is a post request'); 
});

app.get('/users', (req, res) => {
    return res.json({ users });
});

app.post('/users', (req, resp) => {
    
})

app.listen(3000, function () {
    console.log('Server is up and running');
});