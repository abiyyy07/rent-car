'use client'

// Import Package
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

// Fetching
async function getBookingData() {
    const res = await fetch(`/api/booking/admin/manage`)
    if (!res.ok) {
        throw new Error("Could not load data")
    }
    return res.json()
}

export default function AdminManageBooking() {
    const { data: session, status } : {data: any, status: string} = useSession()
    const [bookings, setBookings] = useState([])
    const router = useRouter()

    // Authenticated Middleware
    useEffect(() => {
        if (status === 'unauthenticated'){
            router.push('/auth/sign-in');
        }
    }, [router, status, session?.user.role]);

    // Fetching Data
    const fetchData = async () => {
        try {
            const data = await getBookingData()
            setBookings(data.data)
        } catch (error){
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <head>
                <title>Admin Manage Booking</title>
            </head>
            <div className="overflow-x-auto">
                {bookings.length > 0 ? (
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
                            {bookings.map((booking: any) => (
                                <tr key={booking.id} className="text-center">
                                    <td className="px-4 py-2 border">{booking.userName}</td>
                                    <td className="px-4 py-2 border">{booking.carName}</td>
                                    <td className="px-4 py-2 border">{booking.hari}</td>
                                    <td className={`px-4 py-2 border ${booking.status === 'Pending' ? 'text-orange-500' : booking.status === 'Accept' ? 'text-green-500' : 'text-red-500'}`}>
                                        {booking.status}
                                    </td>
                                    <td className="px-4 py-2 border">{booking.createAt}</td>
                                    <td className="px-4 py-2 border">
                                        <Link href={`/home/admin/booking/manage/${booking.id}`}>MANAGE</Link>
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
                        <p className="text-gray-500">Tidak ada data booking</p>
                    </div>
                )}
            </div>
        </>
    )
}