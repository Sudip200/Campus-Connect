import { IAuthenticateRequest } from '../../../interfaces/request';
import handleErrorMiddleware from '../../../middleware/handle-error';
import CourseAllocation from '../../../models/CourseAllocation';
import { RequestHandler, Response } from 'express';

const allocateCourse: RequestHandler = async (
  req: IAuthenticateRequest<{}, { faculty_id: string; course_id: string }[]>,
  res: Response
) => {
  try {
    const course_allocation_array = req.body;
    if (!Array.isArray(course_allocation_array) || course_allocation_array.length === 0) {
      return res.status(400).json({ message: 'Invalid payloads' });
    }
    await CourseAllocation.insertMany(course_allocation_array);
    res.status(201).json({
      message: 'Successfully Allocated courses',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err,
    });
  }
};

export default handleErrorMiddleware(allocateCourse);