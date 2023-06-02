const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    username:{
        type:String,
        
    },

    email:{
        type:String,
        unique:true
    },

    password:{
        type:String,
        required:true,
    },

    imageProfile:{
        type:String,
        default:'defaultimageprofile.png'
    },

    imageCover:{
            type:String,
            default:'defaultimagecover.png'
    },

    bio:{
        type:String,
        trim:false
    },

    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Post'
    }],

    role:{
        type:String,
        default:'user'
    },

    followers:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],

    following:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]

},
    { timestamps: true }

);


module.exports=mongoose.model('User',userSchema);