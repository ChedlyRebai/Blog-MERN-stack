const express=require('express')
const { Router } = require('express')
const app = express();
const router=express.Router()
const Post=require('../models/post')
const User=require('../models/user')
const jwt=require('jsonwebtoken')
const bodyParser=require('body-parser')
const multer=require('multer')
const cookieParser = require('cookie-parser');
const uploadMiddleware = multer({ dest: 'uploads/' });

router.use(cookieParser());
router.use(bodyParser.json());


const secret="azerty"

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



app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,text} = req.body;
    const postDoc = await Post.create({
      title,
      text,
      userId:info.id,
    });
    res.json(postDoc);
  });

});

router.post('/creat/:token', upload.any('file') ,(req, res) => {
    //const {token} = req.body;
  //  const {token}=req.params
  
    const tokenValue = req.headers.authorization;
    const token= tokenValue ? tokenValue.replace('Bearer ', '') : '' ;
   
   console.log("token:"+token)

 //  const tokenValue = oken ? oken.replace('Bearer ', '') : '';
  
    console.log(req.body)
    //const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, "secret");
    const id= decoded.id;
    let post = new Post(req.body);
    post.image=filename;      
    post.userId=id;
    post.save().then(
            (newpost) => {               
                      User.findById(id).then(
                        (user)=>{ 
                            user.posts.push(newpost._id);
                            user.updateOne()
                            console.log(user)      
                    })
                res.status( 201).send(newpost)  
        })
        .catch(
            (error) => {
                res.status(400).json(error);
              });
});
           
router.post('/creat', upload.any('file') ,(req, res) => {
    
   
        let post = new Post(req.body);
        post.image=filename;      
        post.save().then(
          (newpost) => {               
            User.findById(id).then(
                (user)=>{ 
                    user.posts.push(newpost._id);
                    newpost.userId=id
            })  
        })
.catch(
            (error) => {
                res.status(400).json(error);
              });
            });
                        
        



            
          
router.delete('/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json({ message: 'Post deleted successfully' });
      })
      .catch(error => {
        res.status(400).json(error);
      });
  });

  
router.get('/allPosts', (req, res) => {
    Post.find({})
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Posts not found' });
        } else {
          res.json(data);
        }
      })
      .catch(error => {
        res.status(400).json(error);
      });
});

  
router.get('/userPosts', (req, res) => {
    const tokenValue = req.headers.authorization;
    const token= tokenValue ? tokenValue.replace('Bearer ', '') : '' ;
    console.log("token:"+token)
    console.log(req.body)
    const decoded = jwt.verify(token, "secret");
    const id= decoded.id;   
    Post.find({userId:id})
      .then(data => {
        if(data.length==0){
            console.log("empty")
        }
        if (!data) {
          res.status(404).json({ message: 'Post not found' });
        } else {
          console.log(data)
          res.send(data)
        }
      })
      .catch(error => {
        res.status(400).json(error);
    });
});


router.get('/:id', (req, res) => {
    const {token} = req.cookies;
    Post.findById(req.params.id)
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Post not found' });
        } else {
          res.json(data);
        }
      })
      .catch(error => {res.status(400).json(error);}
    );
});


router.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Post not found' });
        } else {
          res.json(data);
        }
      })
      .catch(error => {
        res.status(400).json(error);
      });
});


router.get('/search/:title', (req,res) => {  
   Post.find({title: req.params.title})
        .then(
            (data) => {
                res.json(data)
            })
        .catch(
            (error) => {
       res.status(400).json(error)
    })
});


router.post('/likeAndUnlike', async (req, res) => {
  try {
    const tokenValue = req.headers.authorization;
    const token = tokenValue ? tokenValue.replace('Bearer ', '') : '';
    const decoded = jwt.verify(token, "secret");
    const idUser = decoded.id;
    const { idPost } = req.body;

    const post = await Post.findById(idPost);

    if (post.likes.includes(idUser)) {
      await Post.findByIdAndUpdate(idPost, { $pull: { likes: idUser } });
      console.log('User removed from likes');
    } else {
      await Post.findByIdAndUpdate(idPost, { $addToSet: { likes: idUser } });
      console.log('User added to likes');
    }

    console.log(post);
    res.send('Like/unlike operation completed.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


router.post('/removeLike',(req,res)=>{

  const tokenValue = req.headers.authorization;
  const token= tokenValue ? tokenValue.replace('Bearer ', '') : '' ;
  const decoded = jwt.verify(token, "secret");
  const idUser= decoded.id; 
  const {idPost}=req.body;
  
  Post.findById(idPost)
    .then(
      (post)=>{
        console.log(post)
      }
    )
})




module.exports=router;