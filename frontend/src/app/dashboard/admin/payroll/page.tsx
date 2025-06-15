"use client"
import { useState } from "react";
import {
  IndianRupee,
  CalendarCheck,
  CheckCircle,
  Clock
} from "lucide-react";

const initialData = [
  { name: "Dr. Bimal Datta (HoD)", salary: 120000, status: "Paid" },
  { name: "Dr. Amitava Sen", salary: 110000, status: "Pending" },
  { name: "Dr. Sandeep Malik", salary: 110000, status: "Paid" },
  { name: "Dr. Sudarshan Goswami", salary: 110000, status: "Pending" },
  { name: "Dr. Munshi Yusuf Alam", salary: 105000, status: "Paid" },
  { name: "Dr. Debasish Mukherjee", salary: 105000, status: "Pending" },
  { name: "Dr. Himadri Biswas", salary: 105000, status: "Paid" },
  { name: "Dr. Dipankar Misra", salary: 105000, status: "Pending" },
  { name: "Dr. Avijit Bhowmick", salary: 105000, status: "Paid" },
  { name: "Dr. Md Sadim", salary: 105000, status: "Pending" },
];

export default function AdminPayrollPage() {
  const [payroll, setPayroll] = useState(initialData);
  const [showForm, setShowForm] = useState(false);

  const schedulePayment = () => {
    const updated = payroll.map((entry) => ({ ...entry, status: "Paid" }));
    setPayroll(updated);
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-6  mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payroll Management
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-xl font-medium"
        >
          Schedule All Payments
        </button>
      </div>
 {showForm && (
        <div className="mt-4 p-4 border border-brand-200 bg-brand-50 dark:bg-brand-500/10 dark:border-brand-400 rounded-xl">
          <h2 className="text-lg font-semibold text-brand-700 dark:text-brand-200 mb-3">Schedule Payment</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Confirm to schedule payment for all listed faculty.
          </p>
          <div className="flex gap-3">
            <button
              onClick={schedulePayment}
              className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg"
            >
              Confirm Payment
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left">
          <thead className="bg-brand-50 dark:bg-brand-500/10">
            <tr>
              <th className="px-4 py-3 text-gray-700 dark:text-white">Name</th>
              <th className="px-4 py-3 text-gray-700 dark:text-white">Salary</th>
              <th className="px-4 py-3 text-gray-700 dark:text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {payroll.map((teacher, i) => (
              <tr key={i} className="border-t border-gray-100 dark:border-gray-800">
                <td className="px-4 py-3 text-gray-900 dark:text-white">{teacher.name}</td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">₹{teacher.salary}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      teacher.status === "Paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300"
                    }`}
                  >
                    {teacher.status === "Paid" ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    {teacher.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </div>
  );
}
