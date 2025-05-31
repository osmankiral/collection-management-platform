"use client";

import Logo from "@/components/Logo";
import SideBar from "./_components/SideBar";
import TopBar from "./_components/TopBar";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";

interface RouteLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: RouteLayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
console.log(session)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="h-screen flex bg-white p-4 space-x-4">
      <div className="flex flex-col w-64 space-y-4">
        <div className="h-16 bg-white rounded-lg flex items-center justify-center">
          <Logo />
        </div>

        <SideBar />
      </div>

      <div className="flex-1 flex flex-col space-y-4">
        <TopBar />
        <div className="flex-1 bg-white border border-gray-400 rounded-lg p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
