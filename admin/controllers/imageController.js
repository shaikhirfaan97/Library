const User = require("../models/userModel");
// const uploadModel = require("../models/imagemodel");
const multer = require("multer");
const path=require("path");
const fs=require("fs") 

const Storage = multer.diskStorage({
    destination:function(req, res, cb){
        cb(null,'uploads');
    },

    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

//  

const fileFilter=(req,file,cb)=>{
    const allowedFileTypes=['image/jpeg','image/jpg','image/png'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}


// upload image
const upload = multer({storage:Storage,fileFilter}).single('photo')

const postImage = async (req, res) =>{
    upload(req,res,async(err)=>{

        if(err){
            console.log(err);
        }else{
            const id=req.params.id;
            await User.findByIdAndUpdate({_id:id}, {testImage : {
                        // data: req.file.filename,
                        data:fs.readFileSync("uploads/"+req.file.filename),
                        contentType: "image/png"
                    }})
       
            .then(()=>{
                res.send("Successfully uploaded!")
                // getImage(S)
            })
            .catch((err)=>{
               console.log(err);
            })
        }
    })
}


// get uploaded image
const getImage = async(req,res) => {

    const {id} = req.params;
    const downloadImage=await User.findById(id).select('testImage')
    res.status(201).json(downloadImage)
    // try{

    // }
    // catch{
    //     return res.status(404).json({ error: "Image not uploaded" });
    // }
        
}



module.exports = {
    getImage,
    postImage
}