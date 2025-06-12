import { IAuthenticateRequest } from "@src/interfaces/request";
import Leave from "../../../models/Leave";
import { RequestHandler } from "express";

const applyLeave: RequestHandler = async (req: IAuthenticateRequest<{}, {
    leaveReason: string,
    startDate: Date,
    endDate: Date,
}>, res) => {
    try {
        const facultyID = req.user?._id;
        if (!facultyID) {
            return res.status(401).json({ message: 'You are not authorized' });
        }
        const { leaveReason, startDate, endDate } = req.body;

        if (!leaveReason || !startDate || !endDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const leaveApplication = new Leave({
            faculty_id: facultyID,
            leaveReason,
            startDate,
            endDate,
            status: 'pending',
        });
        await leaveApplication.save();
        return res.status(201).json({ message: 'Leave application submitted', leave: leaveApplication });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

export default applyLeave;