import { Award, Calendar, FileText, MessageSquare } from "lucide-react";

const RecentActivities = () => {
  const activities = [
    { type: "assignment", message: "New assignment submitted by John Doe", time: "2 min ago", icon: FileText },
    { type: "grade", message: "Grades updated for CS-101", time: "15 min ago", icon: Award },
    { type: "message", message: "New message from student Sarah", time: "1 hour ago", icon: MessageSquare },
    { type: "schedule", message: "Physics Lab rescheduled to 3 PM", time: "2 hours ago", icon: Calendar }
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
        <button className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400">View All</button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <activity.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities