"use client";

import { useState } from "react";
import { Banknote, ReceiptText, CreditCard, IndianRupee, Smartphone } from "lucide-react";

const paymentMethods = [
  { label: "UPI", icon: Smartphone },
  { label: "Card", icon: CreditCard },
  { label: "Net Banking", icon: Banknote },
];

const pastPayments = [
  { semester: "Semester 5", amount: "₹50,000", date: "Jan 12, 2024" },
  { semester: "Semester 4", amount: "₹60,000", date: "July 10, 2023" },
  { semester: "Semester 3", amount: "₹45,500", date: "Jan 8, 2023" },
];

const StudentFeesPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("UPI");

  return (
    <div className="max-w-4xl mx-auto space-y-8 ">
      {/* Pending Fee Card */}
      <div className="rounded-2xl bg-brand-50 dark:bg-brand-500/20 p-6 shadow-theme-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Pending Semester Fees
            </h2>
            <p className="text-3xl mt-2 font-bold text-brand-700 dark:text-brand-100">₹49,000</p>
          </div>
          <IndianRupee className="w-10 h-10 text-brand-500 dark:text-white" />
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-theme-md ">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Choose Payment Method
        </h3>
        <div className="flex gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.label}
              onClick={() => setSelectedMethod(method.label)}
              className={`flex items-center gap-3 px-2 py-3   rounded-lg border transition-all ${
                selectedMethod === method.label
                  ? "bg-brand-100 border-brand-500 text-brand-700"
                  : "bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
              }`}
            >
              <method.icon className="w-5 h-5" />
              {method.label}
            </button>
          ))}
        </div>
        <button className="mt-6 w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl shadow-theme-sm transition">
          Pay Now with {selectedMethod}
        </button>
      </div>

      {/* Past Payments Section */}
      <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-theme-md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Past Payments
        </h3>
        <ul className="space-y-4">
          {pastPayments.map((payment, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-brand-25 dark:bg-brand-500/10 px-4 py-3 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{payment.semester}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {payment.date} &mdash; {payment.amount}
                </p>
              </div>
              <button className="flex items-center gap-2 text-brand-600 dark:text-brand-300 hover:underline text-sm">
                <ReceiptText className="w-4 h-4" />
                Download Receipt
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentFeesPage;
