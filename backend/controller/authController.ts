import {Request,Response} from "express"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const register = async(req:Request,res:Response) => {
    try{
        const {email,username,password} = req.body;

        
        // const salt = await bcrypt.genSalt(10)
        // const hashPassword = await bcrypt.hash(password,salt)
        
        if (!email || !username || !password){
            res.status(401).json({err:"Please fill all fields"})
        }
        const user = await User.create({...req.body})
        const token = jwt.sign({userId:user._id,username:user.username},process.env.SECRET!,{
            expiresIn:process.env.EXPIRE_IN!
        })
        res.status(200).json({token})
    } catch(err:any){
        res.status(401).json({err:err.message})
    }
}
export const login = async(req:Request,res:Response) => {
    try{
        const {email,password} = req.body;

        if(!email || !password) {
            res.status(401).json({err:"Please fill in all fields"})
        }
        const user = await User.findOne({email:email})
        if(!user){
            res.status(400).json({err:"User does not exist"})
        }
        const auth = await bcrypt.compare(password,String(user?.password))
        if(auth){
            const token = jwt.sign({userId:user?._id,username:user?.username},process.env.SECRET!,{
            expiresIn:process.env.EXPIRE_IN!
            })
            res.status(201).json({user:user?.username,token})
        }

    } catch(err){
        res.status(400).json({err})
    }
}