// app/admin/page.js
"use client";

import AdminDashboard from "./AdminDashboard/page";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../store/store";
// import { cookies } from "next/headers";

const AdminPage = () => {
  const router = useRouter();
  const { token } = useAppSelector((state) => state?.auth);
  console.log('token',token)
  if (token == null) {
    return router.push("/admin/login"); // Redirect to login if not authenticated
  } else {
    return <AdminDashboard />;
  }
};
export default AdminPage;
