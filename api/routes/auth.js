const express=require('express')
const { Router } = require('express')
const router=express.Router()
const app =express()
const bcrypt=require('bcrypt')
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken')
const User = require('../models/user')

app.use(cookieParser());

router.post('/register', async (req,res)=>{
    data=req.body;
    let user= await User.findOne({username:data.username})
    if(!user){
      let newuser=new User(data)
      let salt=bcrypt.genSaltSync(10);
      newuser.password=bcrypt.hashSync(data.password , salt)
      newuser.save().then(
          async (userSaved)=>{
              console.log(userSaved);
              res.send("saved user")
          }
      ).catch(
          (error)=>{
              res.send(error)
          }
      )
    }else{
      res.status(400).send("username is exist")
    }
})



router.post('/login', (req, res) => {
    let data =req.body; 
    
    User.findOne({ username : data.username })
      .then((user) => {
        console.log(data.username)
        
        if (!user) {
          return res.status(400).json(data.username, data.password );
        }
        
        
        bcrypt.compare(data.password, user.password, (err, isMatch) => {
          
          if(err) {
            return res.status(500).json({ message: 'Error while comparing passwords' });
          }

          if(!isMatch) {
            return res.status(400).send('username or password is invalidsppp' );
          }


          let payload = {
            id: user._id,    
            role: user.role,
            email:user.email
          }; 

          let secret = 'secret';
          if (!secret) {
            return res.status(500).json({ message: 'JWT secret is not defined' });
          }

          console.log(data.username)
          let token =jwt.sign(payload,secret)
          res.json({username:data.username,token:token})
         /* jwt.sign(payload, secret, {}, (err, token) => {
            if (err) {
              return res.status(500).json({ message: 'Error while generating JWT' });
            }*/

            // console.log(token)
            // res.cookie('token', token, {
            //   maxAge: 24 * 60 * 60 * 1000, // 1 day
            //   //secure: process.env.NODE_ENV === 'production', // only send cookie over HTTPS in production
            // }).send(data.username);
          });


        });
      })
      
  

router.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});
  



module.exports=router