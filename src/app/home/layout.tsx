"use client"

import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MdDashboard } from "react-icons/md";
import { IoCarSport } from "react-icons/io5";

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    const { data: session, status } : { data: any, status: string} = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/auth/sign-in');
        }
    }, [router, status, session?.user.role]);

    return (
        <>
            {/* Navbar */}
            <nav className="bg-[#053B50]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link href="/" className="text-white font-bold text-xl">
                                    RentCar
                                </Link>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleNavbar}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#053B50] focus:outline-none focus:bg-[#053B50] focus:text-white transition ease-in-out"
                            aria-label="Menu"
                        >
                            <svg
                            className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                            </svg>
                            <svg
                            className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                            </svg>
                        </button>
                        </div>
                        <div className="hidden md:block">
                            <Link href="/" className="mr-1 ml-1 text-black px-2 py-1 bg-yellow-400 font-semibold border border-yellow-400 transition hover:bg-yellow-300">Home</Link>
                        </div>
                    </div>
                </div>
        
                <div className={`md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 sm:px-3 bg-[#053B50]">
                    {session?.user.role === "admin" ? (
                        <div className="">
                            <Link href="/home/admin" className="block text-white hover:text-white mt-2 ml-2">Dashboard</Link>
                            <Link href="/home/admin/accounts" className="block text-white hover:text-white mt-2 ml-2">Accounts</Link>
                        </div>
                    ) : (
                        <div className="">
                            <Link href="/home/user" className="block text-white hover:text-white mt-2 ml-2">Dashboard</Link>
                        </div>
                    )}
                </div>
                </div>
            </nav>
            <div className="flex flex-col md:flex-row h-screen bg-white">
                {/* Sidebar */}
                <div className="hidden md:flex">
                    <div className="bg-[#053B50] text-gray-100 w-full md:w-64 flex-shrink-0 h-auto">
                        <div className="p-4">
                            <h1 className="text-2xl font-semibold mb-4">RentCar Dashboard</h1>
                            <ul>
                                {session?.user?.role === "admin" ? (
                                    <div>
                                        <li className="mb-2">
                                            <Link href="/home/admin" className="block px-4 py-2 rounded hover:bg-gray-700">
                                                <div className="flex text-white font-semibold">
                                                    <MdDashboard className="text-white"/> 
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
                                        <li className="mb-2">
                                            <Link href="/home/admin/car" className="block px-4 py-2 rounded hover:bg-gray-700">
                                                <div className="flex text-white font-semibold">
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAV9JREFUSEvd1T1LHFEYxfHfFhY2FhJfECxMo2AlCDYiFokBP4JYpwuKr4W9KCiKRT6DRQpb80IIItiIjYiVlqIWgo2Fhe5ddmF2nM3cQbdxuss85/zvc+5zZ0qa/JSa7O/9Ar5gGaNoyYnxEQdYw690bVZEvThFW8HzuccArpK6LMA2ZrCHqXInDzmgVvzAJLYwlwcIO+iuxnMY2cUY/lV33/M/wAiOcF2FRPpXpjFsrAvDOK4J0xGtYwmbWIh1r9bt4BtWsZIFGMJPfChonC6/RZjCk/Ai2cE5+l9pXpOfYTANeHoj87p0kh3UAGHUNrCI2UhoGO1wbvMJTcU7C9Bevgd36MBNJKATIfukpiHga/lG7mIa3yMBWZqGgEjP3LIXgAv05criCi7xMX0GE9iP0+dWfcKfNCCsk6Na9GeUqU2bNB3wF+PlL+lvfM4Nor4gU1s0hoLM+otWWBwjeAZ3iToZKPNZBgAAAABJRU5ErkJggg==" className="text-white bg-white mr-2"/> Car List
                                                </div>
                                            </Link>
                                        </li>
                                    </div>
                                ) : (
                                    <div>
                                        <li className="mb-2">
                                            <Link href="/home/user" className="block px-4 py-2 rounded hover:bg-gray-700">
                                                <div className="flex text-white font-semibold text-2xl">
                                                    <MdDashboard className="text-white mt-1 mr-2"/> Dashboard
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link href="/home/user/booking" className="block px-4 py-2 rounded hover:bg-gray-700">
                                                <div className="flex text-white font-semibold text-2xl">
                                                    <IoCarSport className="text-white mt-1 mr-2"/> Booking
                                                </div>
                                            </Link>
                                        </li>
                                    </div>
                                )}
                            </ul>
                        </div>
                        <div className="p-4">
                            <button className="text-white px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 w-full" disabled={isLoading} onClick={() => signOut()}>
                                {isLoading ? "Loading..." : "Logout"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-8 md:flex-1">
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
        </>
    )
  }