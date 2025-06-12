import  { RequestHandler } from 'express';
import handleErrorMiddleware from '../../../middleware/handle-error';
import { IBodyRequest } from '../../../interfaces/request';
import User, { IUser } from '../../../models/User';
let saveStudents: RequestHandler = async (req: IBodyRequest<IUser>, res) => {
  let studentId = req.params;
  let { department, rollNumber, year, section } = req.body;
  await User.findByIdAndUpdate(studentId, {
    department,
    rollNumber,
    year,
    section,
  });
  res.status(200).send({
    message: 'updated',
    studentId,
    department,
    rollNumber,
    year,
    section,
  });
};
saveStudents = handleErrorMiddleware(saveStudents);
export default saveStudents;
