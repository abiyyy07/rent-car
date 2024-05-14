'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

async function getData() {
    const res = await fetch("/api/car/show")
    if (!res.ok) {
        throw new Error("Could not load data.")
    }
    return res.json()
}

export default function AdminCarPage() {
    const [cars, setCars] = useState([])
    const router = useRouter()
    const { data: session, status } : { data: any, status: string} = useSession();
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    // Fetch data
    const fetchData = async (page: Number) => {
        try {
            const data = await getData()
            setCars(data.data)
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error("Terjadi error dalam mengambil data: ", error)
        }
    }

    useEffect(() => {
        fetchData(currentPage)
    }, [currentPage])

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/sign-in')
        } else {
            if (session !== undefined && session.user.role !== "admin") {
                router.push("/home/user")
            }
        }
    }, [status, router, session?.user.role])
    return (
        <>
            <head>
                <title>Admin Car List</title>
            </head>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobil</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {cars.length > 0 &&
                            cars.map((car: any) => (
                                <tr key={car.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{car.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{car.mobil}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={car.imageurl} alt={car.mobil} className="text-white w-24"></img>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link href={`/home/admin/car/detail/${car.id}`} className="bg-blue-600 hover:bg-blue-700 transition text-white px-2 py-1 font-semibold rounded">Detail</Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}