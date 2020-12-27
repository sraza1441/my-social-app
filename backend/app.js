const bodyParser = require('body-parser');
const express  = require('express');
const mongoose = require('mongoose');
const post = require('./models/post');


const Post = require('./models/post');
const app = express();

mongoose.connect("mongodb+srv://sraza1441:pPO4JOmJTKSMTSwo@cluster0.i8mjw.mongodb.net/socialMedia?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to database");
    })
    .catch(() => {
        console.log("Conncetion failed");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.post("/api/posts", (req, res, next) =>{
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
    res.status(201).json({
        message: "Post Added successfully",
        postId: createdPost._id
    });
    });
});

app.put("/api/posts/:id", (req, res, next)=> {
    const post =new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({message: " Update SuccessFul!"});
    });
});

app.get('/api/posts', (req, res, next) =>{
    Post.find()
        .then(documents => {
            res.status(200).json((posts)={
                message: 'Posts fetched Successfully',
                posts: documents
            });
        });
    
});

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json( { message: "Post Deleted!"});
    })
})

module.exports = app;