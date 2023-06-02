const mongoose=require('mongoose')
 mongoose.set('strictQuery', true);
 mongoose.connect("mongodb+srv://user:user@cluster0.6zcerbm.mongodb.net/blogpost",{ useNewUrlParser: true });
 const db=mongoose.connection
 db.on('error',(error)=> console.error(error))
 db.once('open',()=> console.log('connected'))
const express = require('express');
const cors=require('cors')
const app = express();
const bodyParser = require('body-parser');
const userApi=require('./routes/user');
const authApi=require('./routes/auth');
const postApi=require('./routes/post');


app.use(cors({credentials:true,origin:'http://localhost:5173'}));

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth',authApi);
app.use('/user',userApi);
app.use('/post',postApi);


app.listen( 4000 ,()=>{
    console.log("server listen")
})

