import mongoose from "mongoose";

type JobT = {
    
}

const JobSchema = new mongoose.Schema <JobT>({
    position:{
        type:String,
        required:[true,"please provide fill in position field"],
        maxLength:50
    },
    company:{
        type:String,
        required:[true,"please provide fill in company field"],
        maxLength:100
    },
    status:{
        type:String,
        enum:["interview","declined","pending"],
        default:"pending"
    },
    createdAt:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:[true,"Please provide user"]
    }
},{timestamps:true})


export default mongoose.model("Job",JobSchema)