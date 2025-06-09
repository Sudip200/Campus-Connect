import ComponentCard from "@/components/common/ComponentCard";
import { BadgeCheck, XCircle, Clock } from "lucide-react";

export default function LeaveStatus() {
  const leaveStatus = [
    {
      title: "Medical Leave",
      desc: "From 2025-06-01 to 2025-06-05",
      status: "Approved",
    },
    {
      title: "Family Function",
      desc: "From 2025-05-15 to 2025-05-17",
      status: "Rejected",
    },
    {
      title: "Conference Attending",
      desc: "From 2025-06-10 to 2025-06-12",
      status: "Pending",
    },
    {
      title: "Vacation Leave",
      desc: "From 2025-06-20 to 2025-06-25",
      status: "Approved",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
            <BadgeCheck className="w-4 h-4 mr-1" /> Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-300">
            <XCircle className="w-4 h-4 mr-1" /> Rejected
          </span>
        );
      case "Pending":
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            <Clock className="w-4 h-4 mr-1" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6  mx-auto px-4 py-8">
      {leaveStatus.map((leave, index) => (
        <ComponentCard key={index} title={leave.title} desc={leave.desc}>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-white/80">
              Status:
            </span>
            {getStatusBadge(leave.status)}
          </div>
        </ComponentCard>
      ))}
    </div>
  );
}
