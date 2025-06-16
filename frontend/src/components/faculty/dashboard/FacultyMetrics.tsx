import { BookOpen, Calendar, GraduationCap, IndianRupee } from "lucide-react";

const FacultyMetrics = () => {
  const metrics = [
    
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
      value: "6",
      change: "-2%",
      changeType: "negative",
      icon: Calendar,
      color: "orange"
    },
     {
      title: "Total Students",
      value: "70",
      change: "+0.2",
      changeType: "positive",
      icon: GraduationCap,
      color: "warning"
    },
    {
      title: "Payment Info",
      value: "32,000",
      change: "+0.2",
      changeType: "positive",
      icon: IndianRupee,
      color: "warning"
    },
   
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <div key={index} className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
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
export default FacultyMetrics