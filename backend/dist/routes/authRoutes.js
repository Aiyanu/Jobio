import { Router } from "express";
import { login, register } from "../controller/authController.js";
export const AuthRouter = Router();
AuthRouter.route("/login").post(login);
AuthRouter.route("/register").post(register);
