"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { RootState } from "@/store"; // Update with your store path
//import { addSchedule } from "@/store/scheduleSlice"; // Define this action

type Schedule = {
  course_id: string;
  day: string;
  startTime: string;
  endTime: string;
};

export default function ScheduleMaker() {
 // const dispatch = useDispatch();
  //const courses = useSelector((state: RootState) => state.course.allCourses);
 const courses = [
  { id: "CSE101", name: "Data Structures" },
  { id: "CSE102", name: "Operating Systems" },
  { id: "CSE103", name: "Computer Networks" },
  { id: "CSE104", name: "Database Management" },
  { id: "CSE105", name: "Software Engineering" },
];
  const [form, setForm] = useState<Schedule>({
    course_id: "",
    day: "",
    startTime: "",
    endTime: "",
  });

  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (form.course_id && form.day && form.startTime && form.endTime) {
    //  dispatch(addSchedule(form)); // Optional: if you're managing it with Redux
      setSchedules([...schedules, form]);
      setForm({ course_id: "", day: "", startTime: "", endTime: "" });
    }
  };

  return (
    <div className="p-6 space-y-8 text-slate-900 dark:text-slate-50">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-xl font-semibold mb-4">Create Schedule</h2>

        <div className="grid md:grid-cols-4 gap-4">
          <select
            name="course_id"
            value={form.course_id}
            onChange={handleChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-white/[0.05]"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name="day"
            value={form.day}
            onChange={handleChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-white/[0.05]"
          >
            <option value="">Select Day</option>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>

          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-white/[0.05]"
          />
          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-white/[0.05]"
          />
        </div>

        <div className="mt-6">
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Schedule
          </button>
        </div>
      </div>

      {/* Scheduled Entries */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-xl font-semibold mb-4">Scheduled Courses</h2>
        <div className="space-y-3">
          {schedules.map((item, idx) => {
            const course = courses.find((c) => c.id === item.course_id);
            return (
              <div
                key={idx}
                className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-white/[0.05]"
              >
                <p className="text-sm font-medium">
                  <span className="text-gray-600 dark:text-gray-300">Course:</span> {course?.name}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  {item.day} — {item.startTime} to {item.endTime}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
