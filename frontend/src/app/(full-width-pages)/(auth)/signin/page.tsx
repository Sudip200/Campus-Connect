import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Management System Signin Page",
  description: "This is the Signin Page for the College Management System",
};

export default function SignIn() {
  return <SignInForm />;
}
