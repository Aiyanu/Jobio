var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password } = req.body;
        // const salt = await bcrypt.genSalt(10)
        // const hashPassword = await bcrypt.hash(password,salt)
        if (!email || !username || !password) {
            res.status(401).json({ err: "Please fill all fields" });
        }
        const user = yield User.create(Object.assign({}, req.body));
        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.SECRET, {
            expiresIn: process.env.EXPIRE_IN
        });
        res.status(200).json({ token });
    }
    catch (err) {
        res.status(401).json({ err: err.message });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).json({ err: "Please fill in all fields" });
        }
        const user = yield User.findOne({ email: email });
        if (!user) {
            res.status(400).json({ err: "User does not exist" });
        }
        const auth = yield bcrypt.compare(password, String(user === null || user === void 0 ? void 0 : user.password));
        if (auth) {
            const token = jwt.sign({ userId: user === null || user === void 0 ? void 0 : user._id, username: user === null || user === void 0 ? void 0 : user.username }, process.env.SECRET, {
                expiresIn: process.env.EXPIRE_IN
            });
            res.status(201).json({ user: user === null || user === void 0 ? void 0 : user.username, token });
        }
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
