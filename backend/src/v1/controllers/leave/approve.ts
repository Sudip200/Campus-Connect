import { RequestHandler } from "express";
import Leave from "../../../models/Leave";
import { IAuthenticateRequest } from "@src/interfaces/request";

const approveLeave: RequestHandler = async (req:IAuthenticateRequest<{
    action:"approved"|"rejected"
}>, res) => {
    try {
        const leaveId = req.params.id;
        const action = req.query.action;
        if(!req.user){
            return res.status(400).json({ message: "Not Authorized" });
        }
        if (!leaveId) {
            return res.status(400).json({ message: "Leave ID is required" });
        }
        const leave = await Leave.findById(leaveId);
        if (!leave) {
            return res.status(404).json({ message: "Leave application not found" });
        }
        leave.status = action;
        await leave.save();
        return res.status(200).json({ message: "Leave approved", leave });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

export default approveLeave;