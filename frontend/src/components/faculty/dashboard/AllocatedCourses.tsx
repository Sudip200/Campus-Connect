import { ChevronRight, MoreHorizontal } from "lucide-react";
interface Course {
  title: string;
  courseCode: string;
  sem: number;
  stream:string;
}
const AllocatedCourses = ({courses}:{
    courses:Course[]
}) => {
  const departments = [
    { name: "Computer Science", faculty: 24, students: 320, courses: 12, growth: "+8%" },
    { name: "Mathematics", faculty: 18, students: 280, courses: 10, growth: "+5%" },
    { name: "Physics", faculty: 15, students: 190, courses: 8, growth: "+3%" },
    { name: "Chemistry", faculty: 12, students: 150, courses: 6, growth: "+2%" }
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Allocated Courses</h3>
        <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
      </div>
      <div className="space-y-4">
        {courses.map((dept:any, index:number) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{dept.title}</h4>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{dept.sem} sem</span>
                <span>{dept.courseCode}</span>    
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-success-500">{dept.growth}</div>
              <ChevronRight className="w-4 h-4 text-gray-400 ml-auto mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AllocatedCourses