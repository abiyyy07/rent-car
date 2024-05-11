"use client"

import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    const { data: session, status } : { data: any, status: string} = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/auth/sign-in');
        } else {
            if (session !== undefined && session.user.role === "admin") {
                router.push("/home/admin")
            } else (
                router.push("/home/user")
            )
        }
    }, [router, status, session?.user.role]);

    return (
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="bg-gray-800 text-gray-100 w-full md:w-64 flex-shrink-0 h-auto">
                <div className="p-4">
                    <h1 className="text-2xl font-semibold mb-4">RentCar Dashboard</h1>
                    <ul>
                        <li className="mb-2">
                            <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
                                <div className="flex text-white font-semibold">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAIBJREFUSEvtlTEOgCAQBIePGS38tYn6Mm3EQoNOLoFGaVnYzN0tJCqvVPl+mhvMQF+gWoDh2FuBTuhuBNtLyTKx1f0GxYKew3OdIltbqwv34GnaJmDMbFECnc/mBhY9HDSLHm5ydQP7FoUJ7EGrC+fgwwY2B1bX/su0OdC66p/+DmVNKBlfzGUIAAAAAElFTkSuQmCC" className="text-white bg-white mr-2"/> Dashboard
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="p-4">
                    <button className="text-white px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 w-full" disabled={isLoading} onClick={() => signOut()}>
                        {isLoading ? "Loading..." : "Logout"}
                    </button>
                </div>
            </div>

            <div className="flex-1 p-8">
                <div className="flex justify-between flex-col md:flex-row">
                    <h1 className="text-2xl font-semibold mb-4">You are logged as, {session?.user?.email}</h1>
                </div>
                <div className="md:grid-cols-2 lg:grid-cols-4 gap-4 flex-col">
                    <div className="bg-white rounded-lg shadow-md p-4 mb-3">
                        <div className="text-black">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    )
  }