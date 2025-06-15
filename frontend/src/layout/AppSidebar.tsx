"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useSidebar } from "../context/SidebarContext";
import {
  LayoutDashboard,
  Calendar,
  User,
  FileText,
  Table,
  BookOpen,
  BarChart,
  Users,
  Key,
  ChevronDownIcon,
  Clipboard,
  Hand,
  CalendarClock,
  Currency,
  CurrencyIcon,
  IndianRupee,
  BookCopy,
  Banknote,
  Clock,
  Mail,
  University,
  LucideUniversity,
  GraduationCap,
} from "lucide-react";
import { RootState, AppDispatch } from "@/lib/store";
import { getUserDetails } from "@/lib/actions/authActions";
import { DollarLineIcon, HorizontaLDots } from "@/icons";
import { TimeToLeave } from "@mui/icons-material";
import NoticeBoard from "@/app/dashboard/faculty/notices/page";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  const role = authState?.user?.role;

  useEffect(() => {
    if (!authState.user) {
      dispatch(getUserDetails());
    }
  }, [dispatch]);

  const navItems: NavItem[] = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      name: "Dashboard",
      subItems: [
        {
          name: "Overview",
          path: `/dashboard/${role}`,
        },
      ],
    }
  ];

  if (role === "faculty") {
    navItems.push(
      {
        icon: <BookOpen className="w-5 h-5" />,
        name: "Courses",
        subItems: [
          { name: "Course List", path: "/dashboard/faculty/courses/list" },
          { name: "Enrollments", path: "/dashboard/faculty/courses/enrollments" },
        ],
      },
      {
        icon: <Clipboard className="w-5 h-5"/>,
        name: "Notices",
        subItems: [
          { name: "View Notices", path: "/dashboard/faculty/notices/" },
        ],
      },
      {
        icon: <CalendarClock className="w-5 h-5"/>,
        name: "Apply Leave",
        subItems: [
          { name: "Apply Leave", path: "/dashboard/faculty/leave/apply" },
          { name: "See Status", path: "/dashboard/faculty/leave/status" }
          ,
        ],
      },
        {
        icon: <IndianRupee className="w-5 h-5"/>,
        name: "Salary",
        subItems: [
          { name: "Salary", path: "/dashboard/faculty/salary/status" },
          { name: "Update Payment Info", path:"/dashboard/faculty/salary/payment"}
        ],
      },
      {
        icon: <Table className="w-5 h-5" />,
        name: "Attendance",
        subItems: [
          { name: "Student Attendance", path: "/dashboard/faculty/attendence/" },
          { name: "Reports", path: "/dashboard/faculty/attendance/reports" },
        ],
      }
    );
  } else if (role === "admin") {
    navItems.push(
      {
        icon: <Clipboard className="w-5 h-5" />,
        name: "Notices",
        subItems: [
          { name: "Create Notices", path: "/dashboard/admin/notice" },
        ],
      },
      {
        icon: <IndianRupee className="w-5 h-5" />,
        name: "Fees",
        subItems: [
          { name: "Students", path: "/dashboard/admin/fees" },
        ],
      },
       {
        icon: <User className="w-5 h-5" />,
        name: "Users",
        subItems: [
          { name: "Students", path: "/dashboard/admin/users/students" },
          { name: "Faculties", path: "/dashboard/admin/users/faculties" },
        ],
      },
      {
        icon: <Clock className="w-5 h-5" />,
        name: "Schedule",
        subItems: [
          { name: "Manage Schedule", path: "/dashboard/admin/schedule" },
        ],
      },
      {
        icon: <Mail className="w-5 h-5" />,
        name: "Leave",
        subItems: [
          { name: "Manage Leaves", path: "/dashboard/admin/leaves" },
        ],
      },
       {
        icon: <Banknote className="w-5 h-5" />,
        name: "Payroll",
        subItems: [
          { name: "View Status", path: "/dashboard/admin/payroll" },
        ],
      },
      {
        icon: <BookCopy className="w-5 h-5" />,
        name: "Courses",
        subItems: [
          { name: "Allocate courses", path: "/dashboard/admin/courses" },
        ],
      }
    );
  } else if (role === "student") {
    navItems.push({
      icon: <Calendar className="w-5 h-5" />,
      name: "Timetable",
      path: "/dashboard/student/timetable",
    },{
      icon: <IndianRupee className="w-5 h-5" />,
      name: "Fees",
      path: "/dashboard/student/fees",
    },{
      icon: <Clipboard className="w-5 h-5" />,
      name: "Notices",
      path: "/dashboard/student/notices",
    });
  }

  const [openSubmenu, setOpenSubmenu] = useState<{ type: "main"; index: number } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({ type: "main", index });
          }
        });
      }
    });
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `main-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) => {
      if (prev?.index === index) return null;
      return { type: "main", index };
    });
  };

   const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
  if (!authState.user) return null;

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              {/* <Image src="/images/logo/logo.svg" alt="Logo" width={150} height={40} className="dark:hidden" />
              <Image src="/images/logo/logo-dark.svg" alt="Logo" width={150} height={40} className="hidden dark:block" /> */}
              <div className="flex items-center space-x-3">
                <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-brand-500 to-brand-700 shadow-lg">
                  <GraduationCap className="text-white" width={32} height={32} />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-brand-600 flex items-center justify-center">
                    <span className="block w-2 h-2 bg-brand-600 rounded-full"></span>
                  </span>
                </span>
                <span className="text-xl font-bold text-brand-700 dark:text-brand-50 tracking-tight select-none">
                  Campus Connect
                </span>
              </div>
            </>
          ) : (
             <div className="flex items-center space-x-3">
             
              </div>
          )}
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <h2 className={`mb-4 text-xs uppercase text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
            {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
          </h2>
          {renderMenuItems(navItems,"main")}
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
