import jwt from 'jsonwebtoken'

import 'dotenv/config'

export const authmiddleware = async(req,res,next) =>{
    const authHead = req.headers.authorization
   

    if(!authHead){
        return res.status(401).json({message:"  Token Missing"})
    }

    const token = authHead.split(' ')[1]

    try{
        const decode = jwt.verify(token,process.env.SECREATKEY)
        
        req.userid = decode.id;
        next();
    }catch(err){
        return res.status(401).json({message:"server error",error:err.message})
    }


 }

