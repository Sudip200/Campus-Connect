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
  XCircle,
  Currency,
  IndianRupee,
  GraduationCap
} from 'lucide-react';
import MonthlySalesChart from '@/components/ecommerce/MonthlySalesChart';
import StatisticsChart from '@/components/ecommerce/StatisticsChart';
import AttendanceChart from '@/components/admin/AttendanceChart';
import { cookies } from 'next/headers';
import AllocatedCourses from '@/components/faculty/dashboard/AllocatedCourses';
import RecentActivities from '@/components/faculty/dashboard/RecentActivities';
import ScheduleOverview from '@/components/faculty/dashboard/ScheduleOverView';
import FacultyMetrics from '@/components/faculty/dashboard/FacultyMetrics';



export default async function FacultyDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('Authorization')?.value;
  const res = await fetch(`${process.env.API_BASE_URL}/v1/courses/get-allocations?faculty_id=68440154ea307e48b85018d1`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });
  let data = await res.json()
  let courses = data.faculties[0].courses
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Faculty Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! manage your activities today.</p>
        </div>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Faculty Metrics - Full width */}
          <div className="col-span-12">
            <FacultyMetrics />
          </div>

          {/* Faculty Performance - Left column */}
          <div className="col-span-12 lg:col-span-7">
            <AttendanceChart />
          </div>

          {/* Schedule Overview - Right column */}
          <div className="col-span-12 xl:col-span-5">
            <ScheduleOverview />
          </div>

          {/* Department Overview - Left column */}
          <div className="col-span-12 xl:col-span-7">
            <AllocatedCourses courses={courses} />
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