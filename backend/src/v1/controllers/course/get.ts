import { IQueryRequest } from '@src/interfaces/request';
import handleErrorMiddleware from '../../../middleware/handle-error';
import Course from '../../../models/Course';
import { RequestHandler, Request, Response } from 'express';
import { get } from 'mongoose';

let getCourses: RequestHandler = async (req: IQueryRequest<{ course_code?:string}>, res: Response) => {
  let query = {};
  const course_code = req.query.course_code;
  if (course_code) {
    query = { ...query, courseCode: course_code };
  }
  let allCourses = await Course.find(query);
  if (!allCourses) {
    return res.status(500).json({
      message: 'Error retrieving courses',
    });
  }
  res.status(200).send({
    message: 'got_course_details',
    allCourses
  });

};
getCourses = handleErrorMiddleware(getCourses);
export default getCourses;
