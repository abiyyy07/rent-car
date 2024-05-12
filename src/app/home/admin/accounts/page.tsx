'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Paginate from "@/components/layouts/admin/paginate";
import Link from "next/link";

async function getData(page: Number) {
    const res = await fetch(`/api/accounts?page=${page}`)
    if (!res.ok) {
        throw new Error("Failed Fetch data")
    }
    return res.json();
}

export default function AccountsListPage() {
    const { data: session, status } : { data: any, status: string} = useSession();
    const router = useRouter();
    const [users, setUsers] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async (page: number) => {
        try {
            const data = await getData(page)
            setUsers(data.data)
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData(currentPage)
    }, [currentPage])

    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/auth/sign-in');
        } else {
            if (session !== undefined && session.user.role !== "admin") {
                router.push("/home/user")
            }
        }
    }, [router, status, session?.user.role]);

    return (
        <>
            <head>
                <title>Admin Accounts Control</title>
            </head>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.length > 0 &&
                            users.map((user: any) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link href={`/home/admin/accounts/${user.id}`} className="bg-blue-600 text-white font-semibold px-2 py-1 hover:bg-blue-700 transition rounded">Detail</Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <Paginate 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
        </>
    )
}