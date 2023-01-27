var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(500).json({ err: "Not authorized" });
    }
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.SECRET);
        // @ts-ignore
        req.user = { userId: payload.userId, username: payload.username };
        next();
    }
    catch (err) {
        res.status(500).json({ err: "Not authorized" });
    }
});
export default authMiddleware;
