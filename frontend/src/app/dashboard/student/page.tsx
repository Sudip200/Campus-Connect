import AttendanceChart from "@/components/student/dashboard/AttendanceChart";
import CourseAttendanceChart from "@/components/student/dashboard/CourseWiseAttendance";
import StudentMetrics from "@/components/student/dashboard/StudentMetrics";
import { cookies } from "next/headers";

export default async function StudentDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('Authorization')?.value;
  let res = await fetch(`${process.env.API_BASE_URL}/v1/attendance/student`,{
    headers:{
        'Content-Type': 'application/json',
        'authorization': `${token}`
    }
  })
  if(!res.ok){
    throw new Error("Failed to fetch attendance data");
  }
  let percentage = await res.json();
  return (
    <div className="">
      <div className="">
       
      
         <div className="min-h-screen">
              <div className="mx-auto">
                <div className="mb-8">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Student Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-400">Welcome back! manage your activities today.</p>
                </div>
               <div className="grid grid-cols-12 gap-4 md:gap-6">
                  {/* Faculty Metrics - Full width */}
                  <div className="col-span-12">
                     <StudentMetrics/>
                  </div>
        
                  {/* Faculty Performance - Left column */}
                  <div className="col-span-12 lg:col-span-7">
                    <CourseAttendanceChart/>
                  </div>
        
                  {/* Schedule Overview - Right column */}
                  <div className="col-span-12 xl:col-span-5">
                     <AttendanceChart percentage={percentage.attendancePercentage}  />
                  </div>
        
                  {/* Department Overview - Left column */}
                  <div className="col-span-12 xl:col-span-7">
                   
                  </div>
        
                  {/* Recent Activities - Right column */}
                  <div className="col-span-12 xl:col-span-5">
                   
                  </div>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
}