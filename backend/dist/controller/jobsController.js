var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Jobs from "../models/Jobs.js";
export const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield Jobs.find({});
        res.status(200).json({ jobs });
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
export const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const job = yield Jobs.findById({ id });
        res.status(200).json({ job });
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
export const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { position, company } = req.body;
    try {
        if (!position || !company) {
            res.status(400).json({ err: "Please fill in all fields" });
        }
        const job = yield Jobs.findById(Object.assign({}, req.body));
        res.status(200).json({ job });
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
export const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const job = yield Jobs.findByIdAndUpdate({ id }, Object.assign({}, req.body));
        res.status(201).json({ job });
    }
    catch (err) {
        res.status(400).json({ err });
    }
});
export const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
