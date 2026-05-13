import { redirect } from "next/navigation";

export const metadata = {
  title: "HTML Course",
  description: "Full Ethioweb HTML beginner course modules and certificate track.",
};

export default function HtmlCoursePage() {
  redirect("/html-course/index.html");
}
