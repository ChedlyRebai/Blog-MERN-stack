require('dotenv').config()
const mongoose=require('mongoose')

 mongoose.set('strictQuery', true);
 mongoose.connect("mongodb+srv://user:user@cluster0.6zcerbm.mongodb.net/blogpost",{ useNewUrlParser: true });
 const db=mongoose.connection
 db.on('error',(error)=> console.error(error))
 db.once('open',()=> console.log('connected'))