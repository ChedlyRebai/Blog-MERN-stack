const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
  },
  
  text: {
    type: String,
  },

  image:{
    type:String,
    default:'defaultPostImage.jpeg'
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  tags: {
    type: [String]
  },

  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],

  likes:[{
    type:Schema.Types.ObjectId,
    ref:"User"
  }],

},
  { timestamps: true }

);

module.exports = mongoose.model('Post', postSchema);
