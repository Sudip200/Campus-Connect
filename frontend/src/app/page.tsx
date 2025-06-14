"use client"
import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Users, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Bell, 
  BookOpen, 
  Clock, 
  CreditCard, 
  Eye, 
  MapPin, 
  FileText, 
  UserCheck, 
  Settings, 
  Zap, 
  Shield, 
  Smartphone, 
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Moon,
  Sun
} from 'lucide-react';

const ThemeToggleButton = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
    >
      <Sun className={`absolute w-5 h-5 text-yellow-400 transition-all duration-500 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
      <Moon className={`absolute w-5 h-5 text-blue-300 transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

const FloatingElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <div 
      className="animate-bounce" 
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    >
      {children}
    </div>
  );
};

type FeatureCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  features: string[];
  gradient: string;
  delay?: number;
};

const FeatureCard = ({ icon: Icon, title, features, gradient, delay = 0 }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative group transform transition-all duration-700 hover:scale-105 hover:-translate-y-2`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/30 shadow-2xl">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} mb-6 shadow-lg transform transition-transform duration-300 ${isHovered ? 'rotate-6 scale-110' : ''}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3 text-gray-600 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

type StatCardProps = {
  number: string | number;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const StatCard: React.FC<StatCardProps> = ({ number, label, icon: Icon }) => {
  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-4xl font-bold text-white mb-2">{number}</div>
      <div className="text-blue-100">{label}</div>
    </div>
  );
};

export default function CampusConnectLanding() {
  const [activeTab, setActiveTab] = useState('admin');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const adminFeatures = [
    "Complete payroll management with automated calculations",
    "Intelligent course allocation and scheduling",
    "Comprehensive user management system",
    "Real-time analytics and reporting dashboard",
    "Streamlined leave approval workflows",
    "Advanced notice creation and distribution"
  ];

  const studentFeatures = [
    "Secure online fee payment with multiple gateways",
    "Personalized schedule and calendar management",
    "Instant access to notices and announcements",
    "Real-time attendance tracking and alerts",
    "Campus resources and service integration",
    "Mobile-optimized interface for on-the-go access"
  ];

  const facultyFeatures = [
    "Digital leave management and approval tracking",
    "Detailed salary information and payslip access",
    "Dynamic schedule management and adjustments",
    "Comprehensive attendance tracking tools",
    "Advanced course and content management",
    "Integrated e-learning platform with analytics"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors duration-500">
      {/* Header */}
      <header className="relative z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 sticky top-0">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 shadow-lg">
                <GraduationCap className="text-white" width={32} height={32} />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-blue-600 flex items-center justify-center">
                  <span className="block w-2 h-2 bg-blue-600 rounded-full"></span>
                </span>
              </span>
              <span className="text-xl font-bold text-blue-700 dark:text-blue-50 tracking-tight select-none">
                Campus Connect
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Features</a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Pricing</a>
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">About</a>
              <ThemeToggleButton />
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
        <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-gray-900"></div>

        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-30">
          <FloatingElement delay={0}>
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </FloatingElement>
        </div>
        
        <div className="absolute top-40 right-20 opacity-30">
          <FloatingElement delay={1}>
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </FloatingElement>
        </div>

        <div className="absolute bottom-20 left-20 opacity-30">
          <FloatingElement delay={2}>
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <BarChart3 className="w-12 h-12 text-white" />
            </div>
          </FloatingElement>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Campus Management
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empower your institution with an all-in-one SaaS platform that streamlines administration, 
              enhances student experience, and revolutionizes faculty management.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button className="group bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="group flex items-center space-x-3 text-white hover:text-blue-200 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <Play className="w-6 h-6 ml-1" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <StatCard number="1000+" label="Institutions" icon={GraduationCap} />
              <StatCard number="50K+" label="Students" icon={Users} />
              <StatCard number="5K+" label="Faculty" icon={BookOpen} />
              <StatCard number="99.9%" label="Uptime" icon={Shield} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive Solutions for
              <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Every User Type
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Whether you're an administrator, student, or faculty member, Campus Connect provides 
              tailored tools to enhance your educational experience.
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="flex justify-center mb-16">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-2 border border-white/20 dark:border-gray-700/30 shadow-xl">
              <div className="flex space-x-2">
                {[
                  { id: 'admin', label: 'Administrators', icon: Settings },
                  { id: 'student', label: 'Students', icon: GraduationCap },
                  { id: 'faculty', label: 'Faculty', icon: Users }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === id
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTab === 'admin' && (
              <>
                <FeatureCard 
                  icon={DollarSign} 
                  title="Payroll Management" 
                  features={["Automated salary calculations", "Tax and deduction handling", "Direct bank integration", "Bulk processing support"]}
                  gradient="from-green-500 to-emerald-600"
                  delay={0}
                />
                <FeatureCard 
                  icon={Calendar} 
                  title="Course Allocation" 
                  features={["Smart scheduling algorithms", "Conflict detection", "Workload balancing", "Faculty expertise matching"]}
                  gradient="from-blue-500 to-cyan-600"
                  delay={100}
                />
                <FeatureCard 
                  icon={Users} 
                  title="User Management" 
                  features={["Role-based access control", "Bulk user imports", "Account lifecycle management", "Permission customization"]}
                  gradient="from-purple-500 to-indigo-600"
                  delay={200}
                />
                <FeatureCard 
                  icon={BarChart3} 
                  title="Analytics Dashboard" 
                  features={["Real-time insights", "Custom report generation", "Performance metrics", "Data visualization"]}
                  gradient="from-orange-500 to-red-600"
                  delay={300}
                />
                <FeatureCard 
                  icon={UserCheck} 
                  title="Leave Approval" 
                  features={["Automated workflows", "Balance tracking", "Policy compliance", "Notification system"]}
                  gradient="from-teal-500 to-green-600"
                  delay={400}
                />
                <FeatureCard 
                  icon={Bell} 
                  title="Notice Management" 
                  features={["Rich text formatting", "Targeted distribution", "Scheduled publishing", "Engagement tracking"]}
                  gradient="from-pink-500 to-rose-600"
                  delay={500}
                />
              </>
            )}
            
            {activeTab === 'student' && (
              <>
                <FeatureCard 
                  icon={CreditCard} 
                  title="Fee Payment" 
                  features={["Multiple payment gateways", "Transaction history", "Payment reminders", "Secure processing"]}
                  gradient="from-green-500 to-emerald-600"
                  delay={0}
                />
                <FeatureCard 
                  icon={Calendar} 
                  title="Schedule Viewer" 
                  features={["Personalized timetables", "Event calendars", "Change notifications", "Mobile synchronization"]}
                  gradient="from-blue-500 to-cyan-600"
                  delay={100}
                />
                <FeatureCard 
                  icon={Eye} 
                  title="Notice Viewer" 
                  features={["Prioritized display", "Smart filtering", "Category organization", "Read status tracking"]}
                  gradient="from-purple-500 to-indigo-600"
                  delay={200}
                />
                <FeatureCard 
                  icon={Clock} 
                  title="Attendance Tracking" 
                  features={["Real-time updates", "Visual dashboards", "Low attendance alerts", "Trend analysis"]}
                  gradient="from-orange-500 to-red-600"
                  delay={300}
                />
                <FeatureCard 
                  icon={MapPin} 
                  title="Campus Resources" 
                  features={["Library integration", "Hostel management", "Transport schedules", "Service booking"]}
                  gradient="from-teal-500 to-green-600"
                  delay={400}
                />
                <FeatureCard 
                  icon={Smartphone} 
                  title="Mobile Access" 
                  features={["Responsive design", "Offline capabilities", "Push notifications", "Touch-optimized UI"]}
                  gradient="from-pink-500 to-rose-600"
                  delay={500}
                />
              </>
            )}
            
            {activeTab === 'faculty' && (
              <>
                <FeatureCard 
                  icon={FileText} 
                  title="Leave Management" 
                  features={["Digital applications", "Approval tracking", "Leave balance view", "Automated notifications"]}
                  gradient="from-green-500 to-emerald-600"
                  delay={0}
                />
                <FeatureCard 
                  icon={DollarSign} 
                  title="Salary Management" 
                  features={["Detailed payslips", "Annual summaries", "PDF downloads", "Deduction breakdowns"]}
                  gradient="from-blue-500 to-cyan-600"
                  delay={100}
                />
                <FeatureCard 
                  icon={Calendar} 
                  title="Schedule Management" 
                  features={["Teaching timetables", "Room allocations", "Schedule adjustments", "Conflict resolution"]}
                  gradient="from-purple-500 to-indigo-600"
                  delay={200}
                />
                <FeatureCard 
                  icon={UserCheck} 
                  title="Attendance Tracking" 
                  features={["Bulk entry support", "Automated calculations", "Report generation", "Export capabilities"]}
                  gradient="from-orange-500 to-red-600"
                  delay={300}
                />
                <FeatureCard 
                  icon={BookOpen} 
                  title="Course Management" 
                  features={["Content creation", "Grade management", "Student progress tracking", "Performance analytics"]}
                  gradient="from-teal-500 to-green-600"
                  delay={400}
                />
                <FeatureCard 
                  icon={Zap} 
                  title="E-Learning Platform" 
                  features={["Resource uploads", "Interactive content", "Usage analytics", "Student engagement tracking"]}
                  gradient="from-pink-500 to-rose-600"
                  delay={500}
                />
              </>
            )}
          </div>
        </div>
      </section>
        





        
      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-3">
              <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 shadow-lg">
                <GraduationCap className="text-white" width={32} height={32} />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-blue-600 flex items-center justify-center">
                  <span className="block w-2 h-2 bg-blue-600 rounded-full"></span>
                </span>
              </span>
              <span className="text-xl font-bold text-white tracking-tight select-none">
                Campus Connect
              </span>
            </div>
          </div>
          
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Campus Connect. All rights reserved.</p>
            <p className="mt-2">Transforming education through innovative technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}