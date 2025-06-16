import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  IndianRupee, 
  GraduationCap, 
  User, 
  MoreHorizontal, 
  ChevronRight,
  FileText, 
  Award, 
  MessageSquare 
} from 'lucide-react';
import StatisticsChart from '@/components/ecommerce/StatisticsChart';
import MonthlySalesChart from '@/components/ecommerce/MonthlySalesChart';
import AttendanceChart from '@/components/admin/AttendanceChart';

// Admin Dashboard Metrics Component
const AdminMetrics = () => {
  const metrics = [
    {
      title: 'Total Students',
      value: '1023',
      change: '+4%',
      changeType: 'positive',
      icon: GraduationCap,
      color: 'success'
    },
    {
      title: 'Total Faculty',
      value: '132',
      change: '+2%',
      changeType: 'positive',
      icon: User,
      color: 'orange'
    },
    {
      title: 'Fees Collected',
      value: '₹12,30,000',
      change: '+12%',
      changeType: 'positive',
      icon: IndianRupee,
      color: 'success'
    },
    {
      title: 'Pending Fees',
      value: '₹2,10,000',
      change: '-3%',
      changeType: 'negative',
      icon: IndianRupee,
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <div key={index} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${
                metric.color === 'success' ? 'bg-success-50 dark:bg-success-500/20' :
                'bg-orange-50 dark:bg-orange-500/20'
              }`}>
                <metric.icon className={`w-5 h-5 ${
                  metric.color === 'success' ? 'text-success-500 dark:text-success-400' :
                  'text-orange-500 dark:text-orange-400'
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

// Admin Dashboard Component
export default function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">College Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Overview of college operations and status.</p>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Dashboard Metrics */}
          <div className="col-span-12">
            <AdminMetrics />
          </div>

          {/* Fees Summary Chart */}
          <div className="col-span-12 xl:col-span-7">
            <MonthlySalesChart />
          </div>

          {/* Leave Requests Panel */}
          <div className="col-span-12 xl:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leave Requests</h3>
              <ul className="space-y-3">
                {['M Yousuf','Tapashi Sur','Raj Kumar'].map((name, idx) => (
                  <li key={idx} className="flex justify-between items-center border p-3 rounded-lg dark:border-gray-700">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Reason: Personal</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-2 py-1 text-xs text-white bg-green-500 rounded">Approve</button>
                      <button className="px-2 py-1 text-xs text-white bg-red-500 rounded">Reject</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Notices Panel */}
          <div className="col-span-12 xl:col-span-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notices & Announcements</h3>
              <ul className="space-y-4">
                {["Exam schedule released", "Library closed on Friday", "New faculty joined"]
                  .map((notice, idx) => (
                    <li key={idx} className="border-b pb-2 text-sm text-gray-700 dark:text-gray-300">
                      {notice}
                    </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="col-span-12 xl:col-span-6">
           <AttendanceChart/>
          </div>
        </div>
      </div>
    </div>
  );
}
