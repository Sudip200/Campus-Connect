"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gql, useMutation, useQuery } from "@apollo/client";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchCourses } from "@/lib/actions/courseActions";
import Alert from "@/components/ui/alert/Alert";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";


type Schedule = {
  course_id: string;
  day: string;
  startTime: string;
  endTime: string;
};
const CREATE_SCHEDULE = gql`
  mutation CreateSchedule($input: ScheduleInput!) {
    createSchedule(input: $input) {
      _id
      day
      startTime
      endTime
      course_id
    }
  }
`;
const GET_SCHEDULES = gql`
      query {
          getSchedules{
             _id
             course_id
             day
             startTime
             endTime
      }
}
`
export default function ScheduleMaker() {

  const dispatch = useDispatch<AppDispatch>();
  const courses = useSelector((state: RootState) => state.courses.courses);
  const { data, loading, error } = useQuery(GET_SCHEDULES)

  const [createSchedule] = useMutation(CREATE_SCHEDULE)
  const [form, setForm] = useState<Schedule>({
    course_id: "",
    day: "",
    startTime: "",
    endTime: "",
  });



  const [schedules, setSchedules] = useState<Schedule[]>([]);
  useEffect(() => {
    dispatch(fetchCourses())
  }, [])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    if (form.course_id && form.day && form.startTime && form.endTime) {
      const { data } = await createSchedule({
        variables: { input: form }
      })
      console.log(data)
      setSchedules([...schedules, form]);
      setForm({ course_id: "", day: "", startTime: "", endTime: "" });
      alert('Added course schdule')
    }
  };
  if (loading) return <p>Loading schedules...</p>;
  if (error) return <p>Error fetching schedules: {error.message}</p>;
  return (

    <div className="p-6 space-y-8 text-slate-900 dark:text-slate-50">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-xl font-semibold mb-4">Create Schedule</h2>

        <div className="grid md:grid-cols-4 gap-4 overflow-hidden ">

          <select
            name="course_id"
            value={form.course_id}
            onChange={handleChange}
            className="p-2 rounded-lg  border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>

          <select
            name="day"
            value={form.day}
            onChange={handleChange}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 "
          >
            <option value="">Select Day</option>
            {[
              { name: "Sunday", value: "sun" },
              { name: "Monday", value: "mon" },
              { name: "Tuesday", value: "tue" },
              { name: "Wednesday", value: "wed" },
              { name: "Thursday", value: "thu" },
              { name: "Friday", value: "fri" },
              { name: "Saturday", value: "sat" },
            ].map((day) => (
              <option key={day.value} value={day.value}>
                {day.name}
              </option>
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
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h2 className="text-xl font-semibold mb-4">Scheduled Courses</h2>
        <div className="space-y-3">
          {data.getSchedules.map((item: any, idx: number) => {
            const course = courses.find((c) => c._id === item.course_id);
            return (
              <div
                key={idx}
                className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-white/[0.05]"
              >
                <p className="text-sm font-medium">
                  <span className="text-gray-600 dark:text-gray-300">Course:</span> {course?.title}
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
