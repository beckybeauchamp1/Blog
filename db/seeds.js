require("./schema");
var mongoose = require("mongoose");
var db = mongoose.connection;
var postData = require("./post_data");
var commentData = require("./comment_data");

db.on("error", function(err){
  console.log("Opps! Mongo threw an error.");
  console.log(err.message);
  process.exit();
});

db.once("open", function(){
  console.log("Connected");
  var Post = require("../models/post");
  var Comment = require("../models/comment");

  Comment.remove({}).then(function(){
    Post.remove({}).then(function(){
      forEach(postData, function(postDatum){
        return new Post(postDatum).save().then(function(post){
          return forEach(commentData[post.title], function(commentDatum){
            comment = new Comment(commentDatum);
            console.log("saving " + post.title + "and each comment");
            comment.post = post;
            return comment.save().then(function(comment){
              post.comments.push(comment);
              post.save();
            });
          });
        });
      }).then(function(){
        process.exit();
      });
    });
  });

});

function forEach(collection, callback, index){
  if(!index) index = 0;
  return callback(collection[index]).then(function(){
    if(collection[index + 1]) return forEach(collection, callback, index + 1);
  });
}
