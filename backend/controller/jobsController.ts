import { Response,Request } from "express";
import Jobs from "../models/Jobs.js";
import User from "../models/User.js";

export const getAllJobs = async(req:Request,res:Response) => {
    try{
        const jobs = await Jobs.find({});
        res.status(200).json({jobs})
    }catch(err){
        res.status(400).json({err})
    }
}
export const getJob = async(req:Request,res:Response) => {
    try{const {id} = req.params
    const job = await Jobs.findById({id})
    res.status(200).json({job})
    }catch(err){
        res.status(400).json({err})
    }
}
export const createJob = async(req:Request,res:Response) => {
    const {position,company} = req.body

    try{
        if(!position || !company) {
        res.status(400).json({err:"Please fill in all fields"})
    }
    const job = await Jobs.findById({...req.body})
    res.status(200).json({job})
    }catch(err){
        res.status(400).json({err})
    }
}
export const updateJob = async(req:Request,res:Response) => {
    const {id} = req.params
    try{
        const job = await Jobs.findByIdAndUpdate({id},{...req.body})
        res.status(201).json({job})
    }catch(err){
        res.status(400).json({err})
    }
}
export const deleteJob = async(req:Request,res:Response) => {
    const {id} = req.params
    try{
        const job = await Jobs.findByIdAndDelete({id})
        res.status(201).json({job})
    }catch(err){
        res.status(400).json({err})
    }
}