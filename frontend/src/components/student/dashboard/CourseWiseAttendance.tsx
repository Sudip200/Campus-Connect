"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "@/icons";

// Dynamically import ApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const courseAttendanceData = [
  { course: "DSA", attendance: 85 },
  { course: "DBMS", attendance: 92 },
  { course: "OS", attendance: 78 },
  { course: "CN", attendance: 88 },
  { course: "AI", attendance: 90 },
];

export default function CoursewiseAttendanceChart() {
  const [isOpen, setIsOpen] = useState(false);
const options: ApexOptions = {
  chart: {
    type: "pie"
  },
  stroke:{
    show:false
  },
  labels: courseAttendanceData.map((data) => data.course),
  colors: [
    "#465FFF", // light blue-100
    "#93C5FD", // blue-300
    "#60A5FA", // blue-400
    "#3B82F6", // blue-500
    "#2563EB", // blue-600
    "#1D4ED8", // blue-700 (extra, if more subjects)
  ],
  legend: {
    position: "bottom",
    labels: {
      colors: "#465FFF", // adjust for dark mode if needed
    },
  },
  dataLabels: {
    style: {
      fontSize: "14px",
    },
  },
};

  const series = courseAttendanceData.map((data) => data.attendance);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Course-wise Attendance
          </h3>
          <div className="relative">
            <button onClick={toggleDropdown} className="p-1">
              <MoreDotIcon />
            </button>
          
          </div>
        </div>
        <div className="max-h-[350px]">
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            height={320}
          />
        </div>
      </div>
    </div>
  );
}
