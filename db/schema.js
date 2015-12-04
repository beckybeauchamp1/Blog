var mongoose = require("mongoose");
var Schema = mongoose.Schema;
  ObjectId = Schema.Types.ObjectId;

var PostSchema = new Schema (
  {
  title: String,
  author: String,
  body: String,
  date: { type: Date, default: Date.now },
  comments: [{type: ObjectId, ref: "Comment"}]
},
{
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
}
);

PostSchema.virtual("id").get(function(){
  return this._id;
});

var CommentSchema = new Schema ({
  body: String,
});

var PostModel = mongoose.model("Post", PostSchema);
var Commentmodel = mongoose.model("Comment", CommentSchema);
