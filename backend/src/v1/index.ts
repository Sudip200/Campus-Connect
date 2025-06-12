import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import config from '../config/config';
import AuthMiddleware from '../middleware/auth';

import * as AuthController from './controllers/auth';
import * as UserController from './controllers/user';
import * as CourseController from './controllers/course';
import * as AttendanceController from './controllers/attendance';
import * as LeaveController from './controllers/leave';
import * as NoticeController from './controllers/notices';
import apiSpec from './openapi.json';
import { Upload } from '../services/upload';



const router = Router();
const noticeuploadService = new Upload(true,"disk","src/uploads","cms","notices")
const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
};

router.get('/status', (req, res) => res.json({ status: 'UP' }));

router.post('/auth/login', AuthController.login);
router.post('/auth/signup', AuthController.signup);

router.get('/user/me', [AuthMiddleware], UserController.me);
router.get('/user/all',[AuthMiddleware], UserController.all);
router.post('/user/update', [AuthMiddleware], UserController.saveStudents);

router.get('/courses/get-all', [AuthMiddleware], CourseController.getCourses);
router.get('/courses/get-allocations',[AuthMiddleware],CourseController.getAllocation);
router.post('/courses/allocate-courses',[AuthMiddleware],CourseController.allocateCourse);

router.get('/attendance/get-all', [AuthMiddleware], AttendanceController.getAttendance);
router.post('/attendance/mark', [AuthMiddleware], AttendanceController.attendanceBulk);
router.get('/attendance/student', [AuthMiddleware], AttendanceController.studentAttendance);

router.post('/leave/apply',[AuthMiddleware],LeaveController.applyLeave);
router.post('/leave/approve/:id',[AuthMiddleware],LeaveController.applyLeave);
router.get('/leave/get-all',[AuthMiddleware],LeaveController.getAllLeaves);

router.post('/notices/post',[AuthMiddleware,noticeuploadService.uploadMiddleware],NoticeController.postNotice)
router.get('/notices/get',[AuthMiddleware],NoticeController.get);


// Dev routes
if (config.isDevelopment) {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
