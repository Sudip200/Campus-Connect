import ComponentCard from "@/components/common/ComponentCard";
import { cookies } from "next/headers";

export default async function NoticeBoard() {
  let BASE_URL = process.env.API_BASE_URL;

  let notices = [
    {
      title: "Semester Exams Schedule Released",
      desc: "Dates for mid and end-semester exams have been announced.",
      children: (
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Mid-semester exams start from 10th July. Check the timetable below.
          </p>
        </div>
      ),
    },
    {
      title: "Workshop on AI & ML",
      desc: "A technical workshop organized by the CSE department.",
      children: (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Register before 15th June. Certificates will be provided.
        </p>
      ),
    },
    {
      title: "Placement Drive by Infosys",
      desc: "Eligibility: Final year students with 6.5+ CGPA.",
      children: (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Drive scheduled on 28th June. Prepare your resumes.
        </p>
      ),
    },
    {
      title: "Library Membership Renewal",
      children: (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Renew your membership by 20th June to avoid penalties.
        </p>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5">
      {notices.map((item, index) => (
        <div key={index}>
          <ComponentCard title={item.title} desc={item.desc}>
            {item.children}
          </ComponentCard>
        </div>
      ))}
    </div>
  );
}
