import CourseTable from "@/components/faculty/table/CourseTable";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Table } from "@/components/ui/table";
import React from "react";
import { cookies } from "next/headers";
export default async function() {
const cookieStore = await cookies();
const token = cookieStore.get('Authorization')?.value;
const res = await fetch(`${process.env.API_BASE_URL}/v1/courses/get-all`, {
    cache: 'no-store',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    }
});

if (!res.ok) {
    throw new Error("Failed to fetch courses");
}

  const courses = await res.json();
  return <CourseTable courses={courses.allCourses} />;
}