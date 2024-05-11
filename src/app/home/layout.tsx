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
        }
    }, [router, status, session?.user.role]);

    return (
      <div className="flex flex-col md:flex-row h-screen bg-white">
            {/* Sidebar */}
            <div className="bg-gray-800 text-gray-100 w-full md:w-64 flex-shrink-0 h-auto">
                <div className="p-4">
                    <h1 className="text-2xl font-semibold mb-4">RentCar Dashboard</h1>
                    <ul>
                        {session?.user?.role === "admin" ? (
                            <div>
                                <li className="mb-2">
                                    <Link href="/home/admin" className="block px-4 py-2 rounded hover:bg-gray-700">
                                        <div className="flex text-white font-semibold">
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAIBJREFUSEvtlTEOgCAQBIePGS38tYn6Mm3EQoNOLoFGaVnYzN0tJCqvVPl+mhvMQF+gWoDh2FuBTuhuBNtLyTKx1f0GxYKew3OdIltbqwv34GnaJmDMbFECnc/mBhY9HDSLHm5ydQP7FoUJ7EGrC+fgwwY2B1bX/su0OdC66p/+DmVNKBlfzGUIAAAAAElFTkSuQmCC" className="text-white bg-white mr-2"/> Dashboard Admin
                                        </div>
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="/home/admin/accounts" className="block px-4 py-2 rounded hover:bg-gray-700">
                                        <div className="flex text-white font-semibold">
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAZxJREFUSEu11L1vjWEYx/HPSecmmgpCajHUaOofIF5K01EbU/8CidCkpoYNIQzduyojUukLo9UmBgtB21RIGQnPldxtTh7nPveTU+da7/v6fa/3lj5bq8/6mgImq0Bu4kQK6D3m8bwUYBPAHG5nhGZxvxukBDiPF9hAgFaS2DncwRGcwXoOUgKsJoFpPK6JTGEJy7jYK+AbDlRlGMTPmsgwtvEZx3oFbOIQDuJrBhB/olQdrVSiqPlZRDmeZEoUPbrQK6C9yTEx0ZOBBL2Lw/ttcgR2DSEWwu32u+pLQB/uZ0x3fUdxHTGev/Ayzf+7/7FoJY2u792aHOMZUY/hVJqmdrEtvMHrlM2PTqQcIKZiMTWxSQaxCzNYq3/uBJjAs/TxKW4hjtv3mnNkGMcv3sMnLAKLsd2zOmAIb1PkcWtuNAkf91I5v+BkNXk7u351wFU8wCucbige30InljIO35Vq8xdygDhol0rLkwGPp8P3CJdzgA8YQZSqXvNSQkfxCR9xPAf4kx5KNyoH+8e/V6FSNtkpauzY9GPfM/gL5dBHGcZ57nQAAAAASUVORK5CYII=" className="text-white bg-white mr-2"/> Accounts List
                                        </div>
                                    </Link>
                                </li>
                            </div>
                        ) : (
                            <li className="mb-2">
                            <Link href="/home/user" className="block px-4 py-2 rounded hover:bg-gray-700">
                                <div className="flex text-white font-semibold">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAIBJREFUSEvtlTEOgCAQBIePGS38tYn6Mm3EQoNOLoFGaVnYzN0tJCqvVPl+mhvMQF+gWoDh2FuBTuhuBNtLyTKx1f0GxYKew3OdIltbqwv34GnaJmDMbFECnc/mBhY9HDSLHm5ydQP7FoUJ7EGrC+fgwwY2B1bX/su0OdC66p/+DmVNKBlfzGUIAAAAAElFTkSuQmCC" className="text-white bg-white mr-2"/> Dashboard
                                </div>
                            </Link>
                            </li>
                        )}
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
                    <h1 className="text-2xl font-semibold mb-4">Hello, {session?.user?.username}</h1>
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