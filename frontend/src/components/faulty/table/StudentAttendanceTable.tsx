'use client';
import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addAttendance, fetchAttendance, postAttendance, updateAttendance } from "@/lib/actions/attendance";
import { AppDispatch, RootState } from "@/lib/store";
import { Attendance, AttendanceState } from "@/lib/reducers/attendenceReducer";
import Button from "@/components/ui/button/Button";

interface Student {
    id: string;
    name: string;
    rollNumber: string;
    section: string;
}

interface StudentAttendanceTableProps {
    students: Student[];
    courseId: string;
    date: string;
}

export default function StudentAttendanceTable({ students ,courseId,date}: StudentAttendanceTableProps) {
    const [attendance, setAttendance] = useState<Record<string, boolean>>({});
    const dispatch = useDispatch<AppDispatch>();
    const attendanceState = useSelector((state:RootState):Attendance[] => state.attendance.attendance);
    function isStudentPresent(studentId:string):boolean{
         return attendanceState.some((att:Attendance) => att.student_id === studentId && att.is_present);
    }
    const handleToggle = (id: string) => {
           console.log(attendanceState)
        setAttendance((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        dispatch(updateAttendance({
            student_id: id,
            course_id: courseId,
            is_present: !attendance[id],
            date: new Date().toISOString().split('T')[0]
        }))
        
    };
    useEffect(()=>{
        dispatch(fetchAttendance({
            course_id: courseId,
            date: date
        }));
    },[]);

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
           <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900">
            <div className="dark:text-white">Total Students: {students.length}</div>
            <div className="dark:text-white">Total Presents: {attendanceState.filter((att) => att.is_present).length}</div>
             <Button variant="outline" className="m-4" onClick={() =>{
                dispatch(postAttendance(students.map((student)=>({
                    student_id: student.id,
                    course_id: courseId,
                    is_present: isStudentPresent(student.id),
                    date: new Date().toISOString().split('T')[0]
                }))));
                setAttendance({});
             }}>
               Submit Attendance
             </Button>
           </div>
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[800px]">
                    <Table>
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Name
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Roll Number
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Section
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Present
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {student.name}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {student.rollNumber}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {student.section}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <input
                                            type="checkbox"
                                            checked={!!attendance[student.id] || isStudentPresent(student.id)}
                                            onChange={() => handleToggle(student.id)}
                                            className="accent-brand-500"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}