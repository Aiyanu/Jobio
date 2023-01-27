import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { AuthRouter } from "./routes/authRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
const connectionURL = process.env.URL;
app.use(express.json());
app.use(authMiddleware);
app.use("/api/v1", AuthRouter);
mongoose
    .connect(connectionURL)
    .then(() => {
    console.log("CONNECTED TO DATABASE");
    app.listen(port, () => {
        console.log("Server is running on port ", port);
    });
});
