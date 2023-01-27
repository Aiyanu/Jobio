import User from "../models/User.js";
import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";

const authMiddleware = async(req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(500).json({err:"Not authorized"})
    }

    const token = authHeader?.split(" ")[1]

    try{
        const payload = jwt.verify(token!,process.env.SECRET!)
        // @ts-ignore
        req.user = {userId:payload.userId,username:payload.username}
        next()
    }catch(err){
        res.status(500).json({err:"Not authorized"})
    }
    
}

export default authMiddleware