"use client";

import React, { useState, useEffect } from "react";
import { User, X } from "lucide-react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MoreDotIcon } from "@/icons";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const courseAttendanceData = [
  { course: "DSA", attendance: 85 },
  { course: "DBMS", attendance: 92 },
  { course: "OS", attendance: 78 },
  { course: "CN", attendance: 88 },
  { course: "AI", attendance: 90 },
];

export default function StudentListPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/v1/user/all?role=student`, {
      next: { revalidate: 10 },
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setStudents(data.users || []))
      .catch((err) => console.error("Failed to fetch students", err));
  }, []);

  const openModal = (student: any) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setModalOpen(false);
  };

  const sgpaChartOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: ["Sem 1", "Sem 2", "Sem 3", "Sem 4"] },
    colors: ["#465FFF"],
    grid: { show: true, borderColor: "#E4E7EC", strokeDashArray: 4 },
    plotOptions: { bar: { borderRadius: 4, columnWidth: "40%" } },
    dataLabels: { enabled: true, style: { fontSize: "12px", fontFamily: "Outfit, sans-serif" } },
    tooltip: { theme: "light" },
  };

  const sgpaChartSeries = [{ name: "SGPA", data: [7.5, 8.1, 8.4, 8.0] }];

  const attendanceChartOptions: ApexOptions = {
    chart: { type: "pie", toolbar: { show: false } },
    stroke: { show: false },
    labels: courseAttendanceData.map((data) => data.course),
    colors: ["#465FFF", "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB"],
    legend: {
      position: "bottom",
      labels: { colors: "#475467", useSeriesColors: false },
      fontFamily: "Outfit, sans-serif",
    },
    dataLabels: { style: { fontSize: "14px", fontFamily: "Outfit, sans-serif" } },
    tooltip: { theme: "light" },
    responsive: [{ breakpoint: 640, options: { chart: { height: 300 } } }],
  };

  const attendanceChartSeries = courseAttendanceData.map((data) => data.attendance);

  return (
    <div className="min-h-screen   p-6 font-outfit">
      <h1 className="text-title-md font-bold text-gray-900 dark:text-white mb-8">
        Student List
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-theme-md">
        <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-left text-theme-sm font-semibold text-gray-700 dark:text-gray-300">
              <th className="p-4">Roll Number</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Year</th>
              <th className="p-4">Semester</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={idx} className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="p-4 text-gray-700 dark:text-gray-300">{student.rollNumber}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{student.name}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{student.email}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{student.year}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{student.sem}</td>
                <td className="p-4">
                  <button
                    onClick={() => openModal(student)}
                    className="px-4 py-2 text-sm font-medium bg-brand-500 text-white rounded-lg hover:bg-brand-600 dark:hover:bg-brand-400 transition-colors shadow-theme-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 pt-3.5 z-50 flex items-center justify-center  bg-opacity-60 backdrop-blur-sm overflow-hidden">
          <div className="bg-white  mt-32 dark:bg-gray-900 w-full max-w-5xl mx-4 rounded-2xl shadow-theme-xl p-12 overflow-auto max-h-[90vh] transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-title-sm font-bold text-gray-900 dark:text-white">
                {selectedStudent?.name}'s Details
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-theme-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Personal Information</h3>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Email:</strong> {selectedStudent.email}</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Department:</strong> {selectedStudent.department || "N/A"}</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Year:</strong> {selectedStudent.year}</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Semester:</strong> {selectedStudent.sem}</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Address:</strong> Nabghara Howrah ,West Bengal</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-theme-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Fee Details</h3>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Fees Paid:</strong> ₹70,000</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Pending Fees:</strong> ₹5,000</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-theme-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Semester-wise SGPA</h3>
                  <ReactApexChart
                    options={sgpaChartOptions}
                    series={sgpaChartSeries}
                    type="bar"
                    height={250}
                  />
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-theme-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Course-wise Attendance</h3>
                  <ReactApexChart
                    options={attendanceChartOptions}
                    series={attendanceChartSeries}
                    type="pie"
                    height={320}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}