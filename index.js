// implement express server for REST api demo assignment 

const express = require('express');
const app = express();
const fs = require('fs');

// read in posts.jason
const posts = require('./posts.json');

// allow req.body to use json format
app.use(express.json());


// add a new post. New post is in the body of the post request.
// add to the database.   
// return success message or error if we can't write the file
app.post('/posts', (req, res) => {
    // push new post at end of array
    posts.push(req.body.newPost);
    // write JSON to the file
    let stringData = JSON.stringify(posts, null, 2);
    fs.writeFile('posts.json', stringData, (err) => {
        if (err) return res.status(500).json({message: err});
    });
    return res.status(200).json({message: 'new post added'});
});

// get all posts in response to get request to '/posts'
app.get('/posts', (req, res) => {
    return res.status(200).send(posts);
});


// get a post with a specific id specified in url paremeter
app.get('/posts/:id', (req, res) => {
    let id = req.params.id;
    let foundpost = posts.find((testpost) => {
        return testpost.id == id;
    });
    if (!foundpost) return res.status(404).json({message: 'post not found'});
    else {
        return res.status(200).json({user: foundpost});
    }
});

// update a post by id with the provided new post
app.put('/posts/:id', (req, res) => {
    // retrieve id in url
    let id = req.params.id;
    // find index of that id in posts array
    let foundpostindex = posts.findIndex((testpost) => {
        return testpost.id == id;
    });
    // if not error, replace indexed record with new post
    // and write out file again
    if (foundpostindex == -1) return res.status(404).json({message: 'post not found'});
    else {
        posts[foundpostindex] = req.body.newPost;
        let stringData = JSON.stringify(posts, null, 2);
        fs.writeFile('posts.json', stringData, (err) => {
            if (err) return res.status(500).json({message: err});
        });
        return res.status(200).json({user: posts[foundpostindex]});
    }
});

// start server up
app.listen(3000, function () {
    console.log('Server is up and running');
});