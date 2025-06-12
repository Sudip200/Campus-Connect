import handleErrorMiddleware from "../../../middleware/handle-error"; 
import { IAuthenticateRequest } from "../../../interfaces/request"; 
import Attendence from "../../../models/Attendance"; 
import { RequestHandler } from "express";
let studentAttendance: RequestHandler = async (req:IAuthenticateRequest<{
    course_id?: string;
}>,res)=>{
    const user = req.user;
    const { course_id } = req.query;
    let query:any = {};
    if (!user || user.role !== 'student') {
        return res.status(403).send({ message: 'Access denied. Only students can view their attendance.' });
    }
    if (course_id) {
        query.course_id = course_id;
    }
    const attendanceRecords = await Attendence.find({
        ...query,
        student_id: user._id
    });
    let totalClasses = attendanceRecords.length;
    let totalPresent = attendanceRecords.filter(record => record.is_present).length;
    let attendancePercentage = totalClasses > 0 ? (totalPresent / totalClasses) * 100 : 0;
    if (attendanceRecords.length === 0) {
        return res.status(404).send({ message: 'No attendance records found for the student in the specified course.' });
    }
    res.status(200).send({ attendanceRecords, attendancePercentage });
}
studentAttendance = handleErrorMiddleware(studentAttendance);
export default studentAttendance;