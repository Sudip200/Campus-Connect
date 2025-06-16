import { Star, User } from "lucide-react";

const FacultyPerformanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-theme-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Faculty Performance</h3>
        <button className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">View All</button>
      </div>
      <div className="space-y-4">
        {[
          { name: "Dr. Sarah Wilson", department: "Computer Science", rating: 4.9, students: 120, courses: 3 },
          { name: "Prof. Michael Chen", department: "Mathematics", rating: 4.8, students: 98, courses: 2 },
          { name: "Dr. Emily Rodriguez", department: "Physics", rating: 4.7, students: 87, courses: 4 },
          { name: "Prof. David Kim", department: "Chemistry", rating: 4.6, students: 92, courses: 2 }
        ].map((faculty, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-500/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-brand-500 dark:text-brand-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{faculty.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{faculty.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-warning-500 fill-current" />
                <span className="text-gray-700 dark:text-gray-300">{faculty.rating}</span>
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {faculty.students} students
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                {faculty.courses} courses
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};