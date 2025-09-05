const express = require("express");
const router = express.Router();
const zod = require("zod");
const{ User,Account } = require("../db.js");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

const {authMiddleware} = require("../middleware.js");



const signupSchema = zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup",async (req,res)=> {
const {success}=signupSchema.safeParse(req.body);
if(!success){
    return res.status(411).json({
        message:"Email already taken/ incorrect inputs"
    })
}

const userexsists = await User.findOne({
    username:req.body.username
})

if(userexsists){
    return res.status(411).json({
        message:"user exists"
    })
}

 const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
})


const userid = user._id;



const acc = await Account.create({
    userid,
    balance:1+1000*Math.random()
})


const token = jwt.sign({
    userid
},JWT_SECRET);

res.json({
    message:"User created succesfully",
    token:token
})
})




const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin",async(req, res)=>{

    const {success}=signinBody.safeParse(req.body);
    if(!success){
      return res.json({
           message:"Email already taken/ incorrect inputs"
         })}

    const userexsists = await User.findOne({
       username:req.body.username,
       password:req.body.password
    })
    if(userexsists) {
        const token = jwt.sign({
            userid: userexsists._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;

    }
    else{
        res.json({
        message:"pls signup"
    })}

})




const update = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})
router.put("/",authMiddleware,async(req,res)=>{
    const {success}=signinBody.safeParse(req.body);
    if(!success){
      return res.status(411).json({
           message:"Email already taken/ incorrect inputs"
         })}

        await User.updateOne({
            _id:req.userid
         },req.body)
         
         res.json({
            message: "Updated successfully"
        })
})


const bulk=zod.object({
    username:zod.string().optional(),
    firstName:zod.string().optional(),
    
})

router.get("/bulk",async(req,res)=>{

    const filter = req.query.filter || "";



         
    const users = await User.find(
        
        {
            $or: [
                { firstName: { $regex: filter, $options: "i" } },
                { lastName: { $regex: filter, $options: "i" } }
              ]
            }
    );

    res.json({
        user:users.map(
            user=>({
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                _id:user._id
            }))
    })
})
module.exports =router;
