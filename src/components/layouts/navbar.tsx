'use client';

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { status } : { data: any, status: string} = useSession();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 fixed w-full z-50 top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-white font-bold text-xl">
                                RentCar
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/mobil" className="text-gray-300 hover:text-white">
                                    Mobil
                                </Link>
                                <Link href="/tentang" className="text-gray-300 hover:text-white">
                                    Tentang
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleNavbar}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
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
                    {status === "authenticated" ? (
                        <div className="hidden md:block">
                            <Link href="/home" className="mr-1 ml-1 text-black px-2 py-1 bg-yellow-400 font-semibold border border-yellow-400 transition hover:bg-yellow-300">Dashboard</Link>
                        </div>
                    ) : (
                        <div className="hidden md:block">
                            <Link href="/auth/sign-in" className="mr-1 ml-1 text-black px-2 py-1 bg-yellow-400 font-semibold border border-yellow-400 transition hover:bg-yellow-300">SignIn</Link>
                            <Link href="/auth/sign-up" className="mr-1 ml-1 text-white px-2 py-1 font-semibold bg-transparent border border-yellow-400 transition hover:bg-yellow-400 hover:text-black">SignUp</Link>
                        </div>
                    )}
                </div>
            </div>

            <div className={`md:hidden absolute top-16 left-0 right-0 bg-gray-800 transition-all duration-500 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 sm:px-3">
                    <Link href="/mobil" className="block text-gray-300 hover:text-white mt-1">
                        Mobil
                    </Link>
                    <Link href="/tentang" className="block text-gray-300 hover:text-white mt-1">
                        Tentang
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
