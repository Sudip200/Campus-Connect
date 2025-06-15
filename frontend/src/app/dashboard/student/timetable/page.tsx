// pages/timetable.tsx
import React from "react";

const timetableData = {
  "9:00 - 10:00": ["DBMS", "OS", "DSA", "AI", "CN", "---"],
  "10:00 - 11:00": ["CN", "DBMS", "SE", "OS", "DSA", "---"],
  "11:00 - 12:00": ["OS Lab", "DSA Lab", "DBMS Lab", "AI Lab", "CN Lab", "---"],
  "12:00 - 1:00": ["---", "---", "---", "---", "---", "---"], // Break
  "1:00 - 2:00": ["SE", "CN", "AI", "DBMS", "OS", "---"],
  "2:00 - 3:00": ["Project", "Project", "Seminar", "Library", "Soft Skills", "---"],
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TimetablePage() {
  return (
    <div className="">
      <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">College Timetable</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 p-2 bg-gray-200 dark:bg-gray-800 text-left">Time</th>
                  {days.map((day) => (
                    <th key={day} className="border border-gray-300 dark:border-gray-700 p-2 bg-gray-200 dark:bg-gray-800 text-left">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(timetableData).map(([time, subjects], idx) => (
                  <tr key={time} className={idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}>
                    <td className="border border-gray-300 dark:border-gray-700 p-2 font-medium text-gray-700 dark:text-gray-200">{time}</td>
                    {subjects.map((subject, i) => (
                      <td key={i} className="border border-gray-300 dark:border-gray-700 p-2 text-gray-700 dark:text-gray-200 text-center">
                        {subject}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
