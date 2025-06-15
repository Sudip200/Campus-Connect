"use client";
import { useState } from "react";
import { ThumbsUp } from "lucide-react";

const initialLeaveRequests = [
  { name: "Dr. Amitava Sen", reason: "Medical leave for 2 days", approved: false },
  { name: "Dr. Sandeep Malik", reason: "Conference participation", approved: false },
  { name: "Mrs. Trisha Mondal", reason: "Family emergency", approved: false }
];

export default function LeaveRequestPage() {
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);

  const approveLeave = (index: number) => {
    const updated = [...leaveRequests];
    updated[index].approved = true;
    setLeaveRequests(updated);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leave Requests</h1>
      {leaveRequests.map((leave, i) => (
        <div
          key={i}
          className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-white/[0.03]"
        >
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">{leave.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{leave.reason}</p>
          </div>
          <button
            onClick={() => approveLeave(i)}
            disabled={leave.approved}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition ${
              leave.approved
                ? "bg-green-200 text-green-800 cursor-not-allowed"
                : "bg-brand-500 hover:bg-brand-600 text-white"
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            {leave.approved ? "Approved" : "Approve"}
          </button>
        </div>
      ))}
    </div>
  );
}
