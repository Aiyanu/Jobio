import {Schema,model, Document} from "mongoose"
import bcrypt from "bcrypt"
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface IUser{
    email:{
        type:string;
        required:[boolean,string];
        unique:boolean;
        match:[RegExp, string]
    }
    username:{
        type:string;
        required:[boolean,string];
        minLength:number;
        maxLength:number;
    }
    password:{
        type:string;
        required:[boolean,string];
        minlength:number;
    }
}

const UserSchema = new Schema <IUser>({
    email:{
        type:String,
        required:[true,"please provide email"],
        unique:[true],
        match:[EMAIL_REGEX  ,"please provide valid email"]

    },
    username:{
        type:String,
        required:[true,"please provide username"],
        minLength:3,
        maxLength:50

    },
    password:{
        type:String,
        required:[true,"please provide password"],
        minlength:8
    }
})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    const hashed =  await bcrypt.hash(String(this.password),salt)
    // @ts-ignore
    this.password = await hashed;
    next()
})

export default model("Users",UserSchema)

