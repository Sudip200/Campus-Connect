import { RequestHandler } from "express";
import Leave from "../../../models/Leave";
import { IAuthenticateRequest } from "../../../interfaces/request";

const getAllLeaves: RequestHandler = async (req:IAuthenticateRequest, res) => {
    try {
        const leaves = await Leave.find()
            .populate({
                path: "faculty_id",
                select: "name email",
            })
            .lean();

        return res.status(200).json({ leaves });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

export default getAllLeaves;