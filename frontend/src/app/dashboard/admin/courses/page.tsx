import {cookies} from "next/headers"
import DraggableCourse from "@/components/admin/DraggableCourses";
export default async function ManageCourses() {
    let cookieStore = await cookies()
    let token  = cookieStore.get("Authorization")
    let res = await fetch(`${process.env.API_BASE_URL}/v1/courses/get-all`,{
      headers:{
        "authorization":`${token?.value}`
      }
    });
    if(!res.ok){
      console.log(await res.json())
       return null
    }
    let courses =  (await res.json()).allCourses;
  return (
    <div className="p-6 grid md:grid-cols-2 gap-6 text-slate-800 dark:text-slate-50">
      <DraggableCourse courses={courses}/>
    </div>
  );
}
