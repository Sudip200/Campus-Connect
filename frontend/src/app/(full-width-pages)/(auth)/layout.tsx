import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GraduationCap, SchoolIcon } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              
              <div className="flex flex-col items-center max-w-xs">
                <Link href="/" className="block mb-4 flex items-center gap-2">
                <div className="flex items-center space-x-3">
                {/* <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-brand-500 to-brand-700 shadow-lg">
                  <GraduationCap className="text-white" width={50} height={50} />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-brand-600 flex items-center justify-center">
                    <span className="block w-2 h-2 bg-brand-600 rounded-full"></span>
                  </span>
                </span> */}
                <span>
                  <Image src="/images/brand/bbit.jpg" width={200} height={200} alt={"brand_logo"}  className="rounded-full"/>
                </span>
                <span className="text-4xl font-bold  text-brand-50 tracking-tight select-none">
                  Campus Connect
                </span>
              </div>
                </Link>
                <p className="text-center text-gray-400 dark:text-white/60">
                 Sign in to your account to continue managing your tasks, projects, and more.
                </p>
              </div>
            </div>
          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
