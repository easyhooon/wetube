import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Comment", CommentSchema);

//mongoose js 는 NodeJS를 위한 Object Modeling 

//To tell Mongoose that here we are gonna save an ID of a different Model

export default model;

