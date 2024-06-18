'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Paginate from "@/components/layouts/admin/paginate";
import Link from "next/link";

async function getDataArchive(page: Number) {
    const res = await fetch(`/api/booking/admin/manage/archive?page${page}`)
    if (!res.ok) {
        throw new Error("Could not load data")
    }
    return res.json()
}

export default function AdminBookingArchivePage() {
    const { data: session, status } : { data: any, status: string} = useSession();
    const router = useRouter();
    const [archives, setArchives] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // fetch data
    const fetchData = async (page: number) => {
        try {
            const data = await getDataArchive(page)
            setArchives(data.data)
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData(currentPage)
    }, [currentPage])

    return (
        <>
            <head>
                <title></title>
            </head>
            <div className="overflow-x-auto">
                {archives.length > 0 ? (
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">User Name</th>
                                <th className="px-4 py-2 border">Car Name</th>
                                <th className="px-4 py-2 border">Days</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Created At</th>
                                <th className="px-4 py-2 border">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {archives.map((archive: any) => (
                                <tr key={archive.id} className="text-center">
                                    <td className="px-4 py-2 border">{archive.userName}</td>
                                    <td className="px-4 py-2 border">{archive.carName}</td>
                                    <td className="px-4 py-2 border">{archive.hari}</td>
                                    <td className={`px-4 py-2 border ${archive.status === 'Pending' ? 'text-orange-500' : archive.status === 'Accept' ? 'text-green-500' : 'text-red-500'}`}>
                                        {archive.status}
                                    </td>
                                    <td className="px-4 py-2 border">{archive.createAt}</td>
                                    <td className="px-4 py-2 border">
                                        <Link href={`/home/admin/booking/archive/manage/${archive.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1">MANAGE</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 mb-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.5-7V7a.5.5 0 011 0v4a.5.5 0 01-.5.5H7a.5.5 0 110-1h2.5zM10 12.5a.5.5 0 100-1 .5.5 0 000 1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-gray-500">Tidak ada data archive</p>
                    </div>
                )}
            </div>
            <Paginate 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
        </>
    )
}