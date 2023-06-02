const express=require('express')
const { Router, application } = require('express')
const router=express.Router()

const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')
const User = require('../models/comment')


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

router.post('/create',upload.any('image'),(req,res)=>{
    res.send('hello')
})



module.exports=router;