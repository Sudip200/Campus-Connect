import { IQueryRequest } from "@src/interfaces/request";
import handleErrorMiddleware from "../../../middleware/handle-error";
import Attendence from "../../../models/Attendance"; // Adjust the import path as necessary
import { RequestHandler } from "express";

let getAttendance:RequestHandler = async (req:IQueryRequest<{
    course_id?: string;
    date?: string;
}>, res) => {
    const { course_id, date } = req.query;
    if (!course_id || !date) {
        return res.status(400).send({ message: 'Course ID and date are required' });
    }
    const attendanceRecords = await Attendence.find({ course_id, date: new Date(date) });

    if (attendanceRecords.length === 0) {
        return res.status(404).send({ message: 'No attendance records found for the given course and date' });
    }

    res.status(200).send({ attendanceRecords });
}

getAttendance = handleErrorMiddleware(getAttendance);
export default getAttendance;