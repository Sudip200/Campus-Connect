import { IBodyRequest } from '@src/interfaces/request';
import Attendence from '../../../models/Attendance';
import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../../middleware/handle-error';

let attendanceBulk: RequestHandler = async (
  req: IBodyRequest<{
    attendance: { is_present: boolean; student_id: string; course_id: string; date: Date }[];
  }>,
  res,
) => {
  const { attendance } = req.body;
  if (!attendance || !Array.isArray(attendance) || attendance.length === 0) {
    return res.status(400).send({ message: 'Invalid attendance data' });
  }

  const result = await Attendence.insertMany(attendance);
  res.status(201).send({ message: 'Attendance records created successfully', data: result });
};

attendanceBulk = handleErrorMiddleware(attendanceBulk);
export default attendanceBulk;
