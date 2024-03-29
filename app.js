//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
var kebabCase = require('lodash.kebabcase');
var lowerCase = require('lodash.lowercase');



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/myblogDB',{useNewUrlParser:true});

const postSchema = new mongoose.Schema({
    title: String,
    message: String
});

const Post = mongoose.model('Post',postSchema);



// var posts = [];
// var pageName = "";
app.get("/",function(req,res){
  Post.find({},function(err,foundItems){
    // if(err){
    //   console.log(err);
    // }
    // else{
    //   console.log("Successfull read the posts from mongoDB");
    // }
    res.render("home",{
      homeContent:homeStartingContent,
      post:foundItems
    });
  });
  
})

app.get("/about",function(req,res){
  res.render("about",{about:aboutContent});

})

app.get("/contact",function(req,res){
  res.render("contact",{contact:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
  
});

app.post("/compose",function(req,res){
  const post = new Post({
      title : req.body.nameTitle,
      message: req.body.namePost
  });
  //posts.push(post);
  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
})
app.get("/post/:postId",function(req,res){
  const id = req.params.postId;
  // let flag = false;
  Post.findOne({_id:id},function(err,post){
    if(!err){
      if(post){
        res.render("post",{heading:post.title, content:post.message});
      }
      else{
        console.log("Not found!");
      }
    }
    
  });
  
});


app.listen(3000,function(){
  console.log("Server started at PORT 3000");
})

