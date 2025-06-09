import AttendanceChart from "@/components/student/dashboard/AttendanceChart";
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
        <AttendanceChart percentage={percentage.attendancePercentage}  />
      </div>
    </div>
  );
}