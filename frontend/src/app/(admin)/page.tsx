"use client";
import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Award, 
  FileText, 
  MessageSquare,
  ChevronRight,
  MoreHorizontal,
  User,
  Mail,
  Phone,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

// Faculty Metrics Component
const FacultyMetrics = () => {
  const metrics = [
    {
      title: "Total Faculty",
      value: "142",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "brand"
    },
    {
      title: "Active Courses",
      value: "38",
      change: "+5%",
      changeType: "positive", 
      icon: BookOpen,
      color: "success"
    },
    {
      title: "Classes Today",
      value: "24",
      change: "-2%",
      changeType: "negative",
      icon: Calendar,
      color: "orange"
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      change: "+0.2",
      changeType: "positive",
      icon: Star,
      color: "warning"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-theme-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${
                metric.color === 'brand' ? 'bg-brand-50 dark:bg-brand-500/20' :
                metric.color === 'success' ? 'bg-success-50 dark:bg-success-500/20' :
                metric.color === 'orange' ? 'bg-orange-50 dark:bg-orange-500/20' :
                'bg-warning-50 dark:bg-warning-500/20'
              }`}>
                <metric.icon className={`w-5 h-5 ${
                  metric.color === 'brand' ? 'text-brand-500 dark:text-brand-400' :
                  metric.color === 'success' ? 'text-success-500 dark:text-success-400' :
                  metric.color === 'orange' ? 'text-orange-500 dark:text-orange-400' :
                  'text-warning-500 dark:text-warning-400'
                }`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{metric.title}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{metric.value}</p>
              </div>
            </div>
            <div className={`text-sm font-medium ${
              metric.changeType === 'positive' ? 'text-success-500' : 'text-error-500'
            }`}>
              {metric.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Faculty Performance Chart
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

// Schedule Overview Component
const ScheduleOverview = () => {
  const [selectedDay, setSelectedDay] = useState('today');
  
  const schedules = [
    { time: "09:00 AM", course: "Data Structures", instructor: "Dr. Sarah Wilson", room: "CS-101", status: "ongoing" },
    { time: "11:00 AM", course: "Calculus II", instructor: "Prof. Michael Chen", room: "M-205", status: "upcoming" },
    { time: "02:00 PM", course: "Physics Lab", instructor: "Dr. Emily Rodriguez", room: "P-Lab1", status: "upcoming" },
    { time: "04:00 PM", course: "Chemistry", instructor: "Prof. David Kim", room: "C-301", status: "upcoming" }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-theme-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Today's Schedule</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-brand-50 text-brand-500 rounded-md dark:bg-brand-500/20 dark:text-brand-400">
            Today
          </button>
          <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md dark:text-gray-400 dark:hover:bg-gray-700">
            Tomorrow
          </button>
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
              <p className="text-sm text-gray-500 dark:text-gray-400">{schedule.instructor} • {schedule.room}</p>
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

// Recent Activities Component
const RecentActivities = () => {
  const activities = [
    { type: "assignment", message: "New assignment submitted by John Doe", time: "2 min ago", icon: FileText },
    { type: "grade", message: "Grades updated for CS-101", time: "15 min ago", icon: Award },
    { type: "message", message: "New message from student Sarah", time: "1 hour ago", icon: MessageSquare },
    { type: "schedule", message: "Physics Lab rescheduled to 3 PM", time: "2 hours ago", icon: Calendar }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-theme-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
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

// Department Overview Component
const DepartmentOverview = () => {
  const departments = [
    { name: "Computer Science", faculty: 24, students: 320, courses: 12, growth: "+8%" },
    { name: "Mathematics", faculty: 18, students: 280, courses: 10, growth: "+5%" },
    { name: "Physics", faculty: 15, students: 190, courses: 8, growth: "+3%" },
    { name: "Chemistry", faculty: 12, students: 150, courses: 6, growth: "+2%" }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-theme-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Department Overview</h3>
        <MoreHorizontal className="w-5 h-5 text-gray-400 cursor-pointer" />
      </div>
      <div className="space-y-4">
        {departments.map((dept, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">{dept.name}</h4>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{dept.faculty} Faculty</span>
                <span>{dept.students} Students</span>
                <span>{dept.courses} Courses</span>
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

// Main Faculty Dashboard Component
export default function FacultyDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Faculty Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your faculty today.</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Faculty Metrics - Full width */}
          <div className="col-span-12">
            <FacultyMetrics />
          </div>

          {/* Faculty Performance - Left column */}
          <div className="col-span-12 xl:col-span-7">
            <FacultyPerformanceChart />
          </div>

          {/* Schedule Overview - Right column */}
          <div className="col-span-12 xl:col-span-5">
            <ScheduleOverview />
          </div>

          {/* Department Overview - Left column */}
          <div className="col-span-12 xl:col-span-7">
            <DepartmentOverview />
          </div>

          {/* Recent Activities - Right column */}
          <div className="col-span-12 xl:col-span-5">
            <RecentActivities />
          </div>
        </div>
      </div>
    </div>
  );
}