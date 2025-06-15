import { cookies } from "next/headers";
 // update with your actual path
import { CheckCircle, XCircle } from "lucide-react";
 interface IUser {
  name:string;
  email: string;
  password: string;
  role: "student" | "admin" | "faculty"; // or import UserRole type if defined elsewhere
  rollNumber?: string;
  department?: string;
  year?: number;
  section?: string;
  sem?:number;
}
const BASE_URL = process.env.API_BASE_URL;

type FeeRecord = {
  email: string;
  paidAmount: number;
  totalFee: number;
};

const demoFeeData: FeeRecord[] = [
  { email: "a@example.com", paidAmount: 10000, totalFee: 10000 },
  { email: "b@example.com", paidAmount: 5000, totalFee: 10000 },
  { email: "c@example.com", paidAmount: 10000, totalFee: 10000 },
  { email: "d@example.com", paidAmount: 0, totalFee: 10000 },
  { email: "e@example.com", paidAmount: 8000, totalFee: 10000 }
];

export default async function Page({ params }: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization")?.value;
  const courseId = params.courseId;

  const [res, res2] = await Promise.all([
    fetch(`${BASE_URL}/v1/user/all?role=student`, {
      next: { revalidate: 10 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`
      }
    }),
    fetch(`${BASE_URL}/v1/courses/get-all?course_code=${courseId}`, {
      next: { revalidate: 10 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`
      }
    })
  ]);

  if (!res.ok) throw new Error("Failed to fetch students");
  if (!res2.ok) throw new Error("Failed to fetch course details");

  const studentsData = await res.json();
  const courseDetails = await res2.json();

  const students: IUser[] = studentsData.users;

  // Merge fee info
  const enriched = students.map((student) => {
    const fee = demoFeeData.find((f) => f.email === student.email);
    return {
      ...student,
      paidAmount: fee?.paidAmount ?? 0,
      totalFee: fee?.totalFee ?? 40000
    };
  });

  const totalCollected = enriched.reduce((sum, s) => sum + s.paidAmount, 0);
  const totalExpected = enriched.reduce((sum, s) => sum + s.totalFee, 0);
  const totalPending = totalExpected - totalCollected;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-center border-b pb-4 border-gray-300 dark:border-gray-600">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Fee Status for Course: {courseId}
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Total Collected: ₹{totalCollected} / ₹{totalExpected} |
          Pending: ₹{totalPending}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left">
          <thead className="bg-brand-50 dark:bg-brand-500/10">
            <tr>
              <th className="px-4 py-3 text-gray-700 dark:text-white">Name</th>
              <th className="px-4 py-3 text-gray-700 dark:text-white">Roll Number</th>
              <th className="px-4 py-3 text-gray-700 dark:text-white">Paid</th>
              <th className="px-4 py-3 text-gray-700 dark:text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {enriched.map((student, i) => {
              const isPaid = Math.random()>0.5?false:true;
              return (
                <tr
                  key={i}
                  className="border-t border-gray-100 dark:border-gray-800"
                >
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{student.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{student.rollNumber}</td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    ₹{student.paidAmount} / ₹{student.totalFee}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        isPaid
                          ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300"
                          : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                      }`}
                    >
                      {isPaid ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Paid
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" /> Pending
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
