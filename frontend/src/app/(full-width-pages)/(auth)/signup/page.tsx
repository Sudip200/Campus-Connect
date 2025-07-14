import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Management System SignUp Page",
  description: "This is the SignUp Page for the College Management System",
};

export default function SignUp() {
  return <SignUpForm />;
}
