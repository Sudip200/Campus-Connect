import User from '../../../models/User';
import { IAuthenticateRequest } from '../../../interfaces/request';
import handleErrorMiddleware from '../../../middleware/handle-error';
import CourseAllocation from '../../../models/CourseAllocation';
import { RequestHandler, Response } from 'express';
import { all } from '../user';
const getAllocatedCourse: RequestHandler = async (
  req: IAuthenticateRequest<{ faculty_id?: string }, {}>,
  res: Response,
) => {
  try {
    let query:{faculty_id?:string} = {};
    let user_query:{_id?:string} = {};
    let faculty_id = req.query.faculty_id;
    if (faculty_id) {
      query = { faculty_id };
      user_query = { _id:faculty_id}
    }
    let allocations = await CourseAllocation.find(query).populate('course_id').populate('faculty_id').lean().exec();
    let facultyList = await User.find({ ...user_query, role: 'faculty' as any }).exec();
    const facultyMap: Record<string, { id: string; name: string; courses: any[] }> = {};
    facultyList.forEach((alloc: any) => {
      const faculty = alloc;
      const course = allocations.filter(
        (record) =>
          record.faculty_id &&
          (record.faculty_id as any)._id &&
          (record.faculty_id as any)._id.toString() === faculty._id.toString()
      );
      if (!faculty) return; 
      if (!facultyMap[faculty._id]) {
        facultyMap[faculty._id] = {
          id: faculty._id,
          name: faculty.name,
          courses: [],
        };
      }
      if (course) {
        facultyMap[faculty._id].courses = course.map((doc)=>doc.course_id);
      }
    });
    let faculties = Object.values(facultyMap);
    res.status(201).json({
      message: 'success',
      faculties
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err,
    });
  }
};

export default handleErrorMiddleware(getAllocatedCourse);
