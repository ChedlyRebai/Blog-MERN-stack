const express=require('express')
const { Router } = require('express')
const router=express.Router()

const User=require('../models/user')
const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')
const user = require('../models/user')
const multer=require('multer')


let filename='';

const mystorage=multer.diskStorage({
    destination: './uploads',
    filename:(req,file,redirect)=>{
        let date=Date.now();
        let f1=date+'.'+file.mimetype.split('/')[1];
        redirect(null,f1);
        filename=f1;
    }
})

const upload=multer({storage:mystorage})

router.get('/',(req,res)=>{
    User.find({}).then(
        (data)=>{    
            res.status(200).send(data)
        }
    ).catch(
        (error)=>{
            res.status(400).send(error)
        }
    )
})


router.get('search/:username',async (req,res)=>{
    const { username } = req.params;
    const regex = new RegExp(username, 'i');
    User.find({ username: regex }).then(
        (data)=>{
            res.status(200).send(data)
        }
    ).catch(
        (error)=>{
            res.status(400).send(error)
        }
    )


})

router.get('/getUserByToken',(req,res)=>{
    const tokenValue = req.headers.authorization;
    const token= tokenValue ? tokenValue.replace('Bearer ', '') : '' ;
    console.log("token:"+token)
    console.log(req.body)
    //const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, "secret");
    const id= decoded.id;
    User.findById(id).then(
        (data)=>{
            console.log(data)
            res.status(200).send(data)
        }
    ).catch(
        (error)=>{
            res.status(400).send(error)
        }
    )
})

router.put('/:id',  upload.any('image')  ,(req,res)=>{
    data=req.body;
    let user=new User(data)
    let salt=bcrypt.genSaltSync(10);
    user.password=bcrypt.hashSync(data.password , salt)
    User.findByIdAndUpdate(req.params.id,req.body).then(
        (data)=>{
            if(!data){
                res.status(400).send('user not found')
            }else{
                res.status(200).send('user updated succefully')
            }
        }

    )
})

router.delete('/:id',(req,res)=>{
    User.findByIdAndDelete({_id:req.params.id}).then(
        (data)=>{
            res.status(200).send(data)
        }
    ).catch(
        (error)=>{
            res.status(400).send(error)
        }
    )
})


router.get('getLastUsers',(req,res)=>{
    User.find({}).sort({createdAt:-1}).limit(5).then(
        (data)=>{
            res.status(200).send(data)
        }
    )
})


module.exports=router;

