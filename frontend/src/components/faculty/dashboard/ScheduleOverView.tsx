const ScheduleOverview = () => {

  
  const schedules = [
    { time: "09:00 AM", course: "Data Structures", room: "CS-101", status: "ongoing" },
    { time: "11:00 AM", course: "Calculus II", room: "M-205", status: "upcoming" },
    { time: "02:00 PM", course: "Digital Electronics", room: "P-Lab1", status: "upcoming" },
    { time: "04:00 PM", course: "Chemistry", room: "C-301", status: "upcoming" }
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Schedule</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-brand-50 text-brand-500 rounded-md dark:bg-brand-500/20 dark:text-brand-400">
            Today
          </button>
          {/* <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:bg-gray-700">
            Tomorrow
          </button> */}
        </div>
      </div>
      <div className="space-y-3">
        {schedules.map((schedule, index) => (
          <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-sm font-medium text-gray-900 dark:text-white min-w-[80px]">
              {schedule.time}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">{schedule.course}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{schedule.room}</p>
            </div>
            <div className={`px-2 py-1 text-xs font-medium rounded-full ${
              schedule.status === 'ongoing' 
                ? 'bg-success-50 text-success-700 dark:bg-success-500/20 dark:text-success-400'
                : 'bg-orange-50 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'
            }`}>
              {schedule.status === 'ongoing' ? 'Live' : 'Upcoming'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ScheduleOverview