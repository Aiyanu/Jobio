var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "please provide email"],
        unique: [true],
        match: [EMAIL_REGEX, "please provide valid email"]
    },
    username: {
        type: String,
        required: [true, "please provide username"],
        minLength: 3,
        maxLength: 50
    },
    password: {
        type: String,
        required: [true, "please provide password"],
        minlength: 8
    }
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt(10);
        const hashed = yield bcrypt.hash(String(this.password), salt);
        // @ts-ignore
        this.password = yield hashed;
        next();
    });
});
export default model("Users", UserSchema);
