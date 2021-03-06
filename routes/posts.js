var express  = require("express");
var router   = express.Router();
var Post     = require("../models/Post");

// Index
router.get("/", function(req, res){
  Post.find({})
  .sort("-createdAt")
  .exec(function(err, posts){
    if(err) return res.json(err);
    res.render("posts/index", {title:'home', posts:posts});
  });
});

// New
router.get("/new", function(req, res){
  res.render("posts/new", {title:"new"});
});

// create
router.post("/", function(req, res){
  Post.create(req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect("/posts");
  });
});

// show
router.get("/:id", function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render("posts/show", {title:"view", post:post});
  });
});

// edit
router.get("/:id/edit", function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render("posts/edit", {title:"edit", post:post});
  });
});

// update
router.put("/:id", function(req, res){
  req.body.updatedAt = Date.now();
  Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect("/posts/"+req.params.id);
  });
});

// destroy
router.delete("/:id", function(req, res){
  Post.remove({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect("/posts");
  });
});

module.exports = router;