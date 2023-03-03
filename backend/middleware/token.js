// const express = require('express');
const jwt=require("jsonwebtoken")


const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    try {
        jwt.verify(token, 'game', function(err, decoded) {
            console.log(decoded)
            req.body.user=decoded.user 
            if(decoded){
                next()
            }
            else
            {
                res.send({"msg":"Please Login"})
            }
          });  
    } catch (error) {
        res.send({"msg":"Wrong Authentication token please verify"})
    }
    
}

module.exports={
    authenticate
}