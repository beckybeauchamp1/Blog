var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/");
var path = require("path");
app.use(express.static(path.join(__dirname,'/public')));

app.set("view engine", "hbs");
app.set("static assets")

app.listen(3000, function(){
  console.log("listening on port 3000");
});

app.get('/', function(req, res){
  res.render("index.html");
});
