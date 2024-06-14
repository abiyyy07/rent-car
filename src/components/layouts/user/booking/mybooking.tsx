'use client'

// Components Package Import
import { useState, useEffect } from "react"

// Icon Import
import { IoMdSad } from "react-icons/io";

async function getBookingData() {
    const res = await fetch(`/api/booking/user/mybooking`);
    if (!res.ok) {
      throw new Error("Could not load data");
    }
    return res.json();
}

export default function MyBookingUserLayout() {
    const [bookings, setBookings] = useState([])

    // Fetch Booking Data
    const fetchBookingData = async () => {
        try {
            const data = await getBookingData();
            setBookings(data.data)
        } catch (error) {
            console.error("Terjadi error dalam mengambil data: ", error);
        }
    };
    
    useEffect(() => {
        fetchBookingData();
    }, []);
    return (
        <>
            {bookings.length > 0 ? (
                bookings.map((booking: any) => (
                    <div className="border rounded-lg shadow p-4 mb-4" key={booking.id}>
                        <div className="text-2xl font-semibold">Nama Peminjam: {booking.userName}</div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="text-gray-600">Car Name: {booking.carName}</div>
                            <div className="text-gray-600">Tipe Peminjaman: {booking.tipe}</div>
                            <div className="text-gray-600">Total Hari: {booking.hari}</div>
                            <div className="text-gray-600">Dibooking Pada: {booking.createAt}</div>
                        </div>
                        <div className="mt-1 font-bold text-xl">
                            <div className={`text-xl ${booking.status === 'Pending' ? 'text-orange-500' : booking.status === 'Accept' ? 'text-green-500' : 'text-gray-700'}`}>
                                Status: {booking.status}
                            </div>
                            <div className="text-gray-500">{booking.nextStep}</div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center mt-4">
                    <IoMdSad className="text-6xl text-gray-500 mx-auto mb-4" />
                    <p className="text-xl">Tidak ada armada yang sedang anda booking.</p>
                </div>
            )}
        </>
    )
}