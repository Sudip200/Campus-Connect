
import CourseTable from "@/components/faulty/table/CourseTable";
import StudentAttendanceTable from "@/components/faulty/table/StudentAttendanceTable";
import InputGroup from "@/components/form/form-elements/InputGroup";
import {cookies} from "next/headers";
import { useParams } from "next/navigation";
interface PageProps {
    params: {
        courseId: string;
    };
}
let BASE_URL = process.env.API_BASE_URL;
export default async function  Page({ params }:any) { 

    const cookieStore = await cookies();
    const courseId = (await params).courseId;
    const token =  cookieStore.get('Authorization')?.value;
    let res = await fetch(`${BASE_URL}/v1/user/all?role=student`,{
        next: {
            revalidate: 10, 
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    });
    let res2 = await fetch(`${BASE_URL}/v1/courses/get-all?course_code=${courseId}`,{
        next: {
            revalidate: 10, 
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    });
    if (!res.ok) {
        throw new Error("Failed to fetch students");
    }
    if (!res2.ok) {
        throw new Error("Failed to fetch course details");
    }
    let students = await res.json();
    let courseDetails = await res2.json();
    return( 
    <div>
        <div className="flex flex-col items-center justify-center mb-4 border-b border-gray-200 dark:border-white/[0.05]">
            <div className="text-3xl  font-medium dark:text-brand-50 text-center mb-1.5">Take attendance for course {courseId} </div>
            <div className="dark:text-white">{new Date().toISOString().split('T')[0]}</div>
        </div>
        <div>
            <StudentAttendanceTable students={students.users} courseId={courseDetails.allCourses[0]._id} date={new Date().toISOString().split('T')[0]}/>
        </div>
    </div>)
}