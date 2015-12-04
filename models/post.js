require("../db/schema");
var mongoose = require("mongoose");
var PostModel = mongoose.model("Post");

module.exports = PostModel;
