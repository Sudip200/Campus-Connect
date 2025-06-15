"use client";

import {
  Banknote,
  Book,
  BellRing,
  GaugeCircle,
} from "lucide-react"; // Or use your preferred icons

const StudentMetrics = () => {
  const metrics = [
    {
      title: "Pending Sem Fees",
      value: "₹69,000",
      changeType: "negative",
      icon: Banknote,
      color: "warning", // Can use orange here if needed
    },
    {
      title: "Total Sem Courses",
      value: "8",
  
      changeType: "positive",
      icon: Book,
      color: "success",
    },
    {
      title: "Active Notices",
      value: "4",
   
      changeType: "positive",
      icon: BellRing,
      color: "brand",
    },
    {
      title: "Average Grade",
      value: "8.4 GPA",
      change: "+0.3",
      changeType: "positive",
      icon: GaugeCircle,
      color: "success",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-lg ${
                  metric.color === "brand"
                    ? "bg-brand-50 dark:bg-brand-500/20"
                    : metric.color === "success"
                    ? "bg-success-50 dark:bg-success-500/20"
                    : metric.color === "orange"
                    ? "bg-orange-50 dark:bg-orange-500/20"
                    : "bg-warning-50 dark:bg-warning-500/20"
                }`}
              >
                <metric.icon
                  className={`w-5 h-5 ${
                    metric.color === "brand"
                      ? "text-brand-500 dark:text-brand-400"
                      : metric.color === "success"
                      ? "text-success-500 dark:text-success-400"
                      : metric.color === "orange"
                      ? "text-orange-500 dark:text-orange-400"
                      : "text-warning-500 dark:text-warning-400"
                  }`}
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {metric.title}
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {metric.value}
                </p>
              </div>
            </div>
            <div
              className={`text-sm font-medium ${
                metric.changeType === "positive"
                  ? "text-success-500"
                  : "text-error-500"
              }`}
            >
              {metric.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentMetrics;
