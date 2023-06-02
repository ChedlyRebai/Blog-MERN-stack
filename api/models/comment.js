const mongoose=require("mongoose");

const {Schema}=mongoose;

const commentSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },

    postId:{
        type:Schema.Types.ObjectId,
        ref:'Post'
    },

    text:{
        type:String,
        required:true
    },

    likes:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]
})

module.exports=mongoose.model('Comment',commentSchema);