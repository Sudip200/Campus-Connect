"use client";

import React, { useState } from "react";
import DatePicker from "@/components/form/date-picker";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

export default function ApplyLeave() {
  const [dateRange, setDateRange] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // You can add actual submission logic here
    console.log("Leave Application Submitted:");
    console.log("Date Range:", dateRange);
    console.log("Reason:", reason);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Leave Application Form</h2>

      <div>
        <DatePicker
          id="leave-dates"
          label="Leave Date Range"
          mode="range"
          placeholder="Select leave date range"
          onChange={(selectedDates: any[]) => {
            const [start, end] = selectedDates || [];
            setDateRange(
              `${start?.toLocaleDateString?.() || ""} - ${end?.toLocaleDateString?.() || ""}`
            );
          }}
        />
      </div>

      <div>
        <Label htmlFor="reason">Reason for Leave</Label>
        <TextArea
          name=""
          placeholder="Enter your reason for leave..."
          value={reason}
          onChange={setReason}
          rows={4}
          hint="Be specific and brief."
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 px-4 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition-colors dark:bg-brand-500 dark:hover:bg-brand-600"
      >
        Submit Leave Application
      </button>
    </form>
  );
}
