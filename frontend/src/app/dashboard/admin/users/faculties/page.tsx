"use client";

import React, { useState } from "react";
import { User, X } from "lucide-react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
// DEMO DATA FOR FACULTY LIST AND ATTENDANCE
const facultyData = [
  { slNo: 1, name: "Mr. Jayanta Basak", panNo: "ARHPB3753D", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "17/11/2021", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 2, name: "Dr. Munshi Yusuf Alam", panNo: "AJTPA3789N", degrees: "M.E/M.Tech & Ph. D.", designation: "Asso. Prof.", dateOfJoining: "22/02/2021", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 3, name: "Dr. Debasish Mukherjee", panNo: "AFNPM4672E", degrees: "M.E/M.Tech & Ph. D.", designation: "Asso. Prof.", dateOfJoining: "17/10/2020", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 4, name: "Dr. Himadri Biswas", panNo: "AWVPB9975A", degrees: "M.E/M.Tech & Ph. D.", designation: "Asso. Prof.", dateOfJoining: "18/08/2021", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 5, name: "Dr. Dipankar Misra", panNo: "ARDPM2337E", degrees: "M.E/M.Tech & Ph. D.", designation: "Asso. Prof.", dateOfJoining: "20/07/2021", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 6, name: "Dr. Arup Roy", panNo: "AMHPR5863M", degrees: "M.E/M.Tech & Ph. D.", designation: "Asso. Prof.", dateOfJoining: "02/02/2022", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 7, name: "Mr. Rupam Sardar", panNo: "BZWPS8881B", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "08/02/2016", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 8, name: "Mrs. Trisha Mondal", panNo: "BWKPM0537P", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "04/12/2018", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 9, name: "Mrs. Rituparna Dey", panNo: "CBEPD4492G", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "13/08/2020", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 10, name: "Mrs. Nivedita Das", panNo: "ARUPD6420N", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "25/07/2022", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 11, name: "Mrs. Mousumi Ojha", panNo: "AJCPD7199J", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "13/02/2023", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 12, name: "Mr. Ashish Pramanik", panNo: "AIMPP6930E", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "07/11/2022", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 13, name: "Mr. Kashi Nath Datta", panNo: "AMSPD1649Q", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "01/08/2022", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 14, name: "Mr. Jayanta Pratihar", panNo: "AKWPP9107F", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "16/11/2021", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 15, name: "Mr. Sagar Chakraborty", panNo: "AHUPC9058R", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "01/08/2022", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 16, name: "Mr. Rakesh Kumar Gupta", panNo: "BJYPG1331A", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "03/08/2019", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 17, name: "Mr. Subhadeep Majumdar", panNo: "BIAPM4584N", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "05/08/2019", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 18, name: "Mr. Rajkumar Paul", panNo: "BCDPP0303D", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "27/07/2022", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 19, name: "Mr. Dipayan Das", panNo: "CCPPS0087J", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "25/07/2023", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 20, name: "Mr. Indrajit Chakraborty", panNo: "AUHPC5458D", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "07/03/2012", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 21, name: "Mr. Sayan Das", panNo: "AQUPD9473E", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "14/09/2019", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 22, name: "Mr. Siddhartha Pradhan", panNo: "DTFPP4859B", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "12/03/2018", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 23, name: "Dr. Sujit Biswas", panNo: "BBRPB3018A", degrees: "M.E/M.Tech & PhD", designation: "Asst. Prof.", dateOfJoining: "18/03/2024", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 24, name: "Mr. Uddyalok Chakraborty", panNo: "ANRPC5576D", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "08/07/2024", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 25, name: "Skwater: Sk. Anamul Sanowar", panNo: "CZRPS5844N", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "05/06/2024", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 26, name: "Mr. Rishov Saha", panNo: "JDTPS7714C", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "26/03/2024", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 27, name: "Mr. Pritesh Mandal", panNo: "DGIPM5990L", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "22/07/2024", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 28, name: "Mrs. Paramita Das", panNo: "BSJPD5084K", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "17/07/2024", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 29, name: "Mr. Arjun Chatterjee", panNo: "AHNPC9811F", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "18/04/2024", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 30, name: "Mr. Archisman Ghosh", panNo: "BWYPG7038K", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "13/03/2024", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 31, name: "Mr. Kaushik Sarkar", panNo: "KTPS8781Q", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "06/05/2024", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 32, name: "Mr. Jyotipriyo Khanra", panNo: "KDTPK9152D", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "30/07/2024", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 33, name: "Mr. Atreyee Datta", panNo: "AOYPC0238C", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "19/03/2024", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
  { slNo: 34, name: "Mr. Kaustav Bandyapadhya", panNo: "AQHPB5549G", degrees: "M.E/M.Tech", designation: "Asst. Prof.", dateOfJoining: "10/06/2024", dateOfLeaving: "", facultyType: "Regular", department: "CSE" },
];

const monthAttendanceData = [
  { month: "Jan", attendance: 90 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 92 },
  { month: "Apr", attendance: 85 },
  { month: "May", attendance: 87 },
  { month: "Jun", attendance: 89 },
  { month: "Jul", attendance: 91 },
  { month: "Aug", attendance: 93 },
  { month: "Sep", attendance: 86 },
  { month: "Oct", attendance: 88 },
  { month: "Nov", attendance: 90 },
  { month: "Dec", attendance: 94 },
];

export default function FacultyListPage() {
  const [faculties, setFaculties] = useState<any[]>(facultyData);
  const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (faculty: any) => {
    setSelectedFaculty(faculty);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFaculty(null);
    setModalOpen(false);
  };

  const performanceChartOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: ["2021", "2022", "2023", "2024"] },
    colors: ["#465FFF"],
    grid: { show: true, borderColor: "#E4E7EC", strokeDashArray: 4 },
    plotOptions: { bar: { borderRadius: 4, columnWidth: "40%" } },
    dataLabels: { enabled: true, style: { fontSize: "12px", fontFamily: "Outfit, sans-serif" } },
    tooltip: { theme: "light" },
  };

  const performanceChartSeries = [{ name: "Publications", data: [5, 8, 12, 10] }];

  const attendanceChartOptions: ApexOptions = {
    chart: { type: "line", toolbar: { show: false } },
    xaxis: { categories: monthAttendanceData.map((data) => data.month) },
    colors: ["#465FFF"],
    grid: { show: true, borderColor: "#E4E7EC", strokeDashArray: 4 },
    stroke: { curve: "smooth", width: 3 },
    markers: { size: 5, colors: ["#465FFF"], strokeWidth: 2, strokeColors: ["#FFFFFF"] },
    dataLabels: { enabled: true, style: { fontSize: "12px", fontFamily: "Outfit, sans-serif" } },
    tooltip: { theme: "light" },
    yaxis: {
      min: 0,
      max: 100,
      labels: { formatter: (val) => `${val}%` },
    },
    responsive: [{ breakpoint: 640, options: { chart: { height: 300 } } }],
  };

  const attendanceChartSeries = [{ name: "Attendance", data: monthAttendanceData.map((data) => data.attendance) }];

  return (
    <div className="min-h-screen  p-6 font-outfit">
      <h1 className="text-title-md font-bold text-gray-900 dark:text-white mb-8">
        Faculty List (CSE 2024-25)
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-theme-md">
        <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-left text-theme-sm font-semibold text-gray-700 dark:text-gray-300">
              <th className="p-4">Sl No.</th>
              <th className="p-4">Name</th>
              <th className="p-4">PAN No.</th>
              <th className="p-4">Degrees</th>
              <th className="p-4">Designation</th>
              <th className="p-4">Date of Joining</th>
              <th className="p-4">Faculty Type</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((faculty, idx) => (
              <tr key={idx} className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="p-4 text-gray-700 dark:text-gray-300">{faculty.slNo}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{faculty.name}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{faculty.panNo}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{faculty.degrees}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{faculty.designation}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{faculty.dateOfJoining}</td>
                <td className="p-4 text-gray-700 dark:text-gray-300">{faculty.facultyType}</td>
                <td className="p-4">
                  <button
                    onClick={() => openModal(faculty)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60 backdrop-blur-sm  ">
          <div className="bg-white mt-32 dark:bg-gray-900 w-full max-w-5xl mx-4 rounded-2xl shadow-theme-xl p-12 overflow-auto max-h-[90vh] transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-title-sm font-bold text-gray-900 dark:text-white">
                {selectedFaculty?.name}'s Details
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
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>PAN No.:</strong> {selectedFaculty.panNo}</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Degrees:</strong> {selectedFaculty.degrees}</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Designation:</strong> {selectedFaculty.designation}</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Department:</strong> {selectedFaculty.department}</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Faculty Type:</strong> {selectedFaculty.facultyType}</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Date of Joining:</strong> {selectedFaculty.dateOfJoining}</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Date of Leaving:</strong> {selectedFaculty.dateOfLeaving || "N/A"}</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Address:</strong> Nabghara, Howrah, West Bengal</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-theme-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Salary Details</h3>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Monthly Salary:</strong> ₹75,000</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300"><strong>Pending Dues:</strong> ₹0</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-theme-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Achievements</h3>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300">Published 10 research papers in peer-reviewed journals</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300">Received Best Faculty Award 2023</p>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-300">Conducted 5 workshops on AI and ML</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-theme-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Research Publications</h3>
                  <ReactApexChart
                    options={performanceChartOptions}
                    series={performanceChartSeries}
                    type="bar"
                    height={250}
                  />
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-theme-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Month-wise Attendance</h3>
                  <ReactApexChart
                    options={attendanceChartOptions}
                    series={attendanceChartSeries}
                    type="line"
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