"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GrProjects } from "react-icons/gr";
import { TbLogs } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { FiMenu} from "react-icons/fi";
import { FiMessageSquare } from "react-icons/fi";
import { SiSkillshare } from "react-icons/si";
import { logout } from "@/services/authServices";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {user,setIsLoading} = useUser();
  console.log(user);
  const handleLogout = () => {
      logout();
      setIsLoading(true);
      router.push("/login");
 };

 const renderSidebarLinks = () => {
      return (
        <>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center gap-2">
            <GrProjects />
            <Link href="/projects">Projects</Link>
          </li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center gap-2">
            <TbLogs />
            <Link href="/blogs">Blogs</Link>
          </li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center gap-2">
            <FiMessageSquare />
            <Link href="/messages">Messages</Link>
          </li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center gap-2">
            <SiSkillshare />
            <Link href="/skills">Skill</Link>
          </li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer flex items-center gap-2">
            <IoMdSettings />
            <Link href="/changePassword">Change Password</Link>
          </li>
        </>
      );
    }

  return (
    <div className="flex min-h-screen">
      {/* Mobile Navbar */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-50 flex items-center">
        <button
          className="bg-gray-800 text-white p-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
         <FiMenu/>
        </button>
        <span className="text-xl font-bold ml-4">Dashboard</span>
      </div>

      {/* Sidebar for Mobile (Hidden by Default) */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white p-4 z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:hidden`}
      >
        <ul className="space-y-2 mt-16" onClick={() => setIsOpen(false)}>
          {renderSidebarLinks()}
        </ul>
        <button
          onClick={handleLogout}
          className="w-full p-2 mt-12 bg-white text-gray-800 rounded"
        >
          Logout
        </button>
      </div>

      {/* Sidebar for Medium & Large Devices (Always Visible) */}
      <div className="hidden sm:block w-64 h-screen bg-gray-800 text-white p-4 fixed top-0 left-0 z-40">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          {renderSidebarLinks()}
        </ul>
        <button
          onClick={handleLogout}
          className="w-full p-2 mt-12 bg-white text-gray-800 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 sm:ml-64 p-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;