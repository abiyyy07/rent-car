'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

import { IoMdAddCircle } from "react-icons/io";
import { IoMdSad } from "react-icons/io";

import MyBookingUserLayout from "@/components/layouts/user/booking/mybooking";
import UserRulesBooking from "@/components/elements/user/booking/rules";

async function getCarData() {
    const res = await fetch("/api/car/show/booking")
    if (!res.ok) {
        throw new Error("Could not load data.")
    }
    return res.json()
}

async function getBookingData() {
    const res = await fetch(`/api/booking/user/mybooking`);
    if (!res.ok) {
      throw new Error("Could not load data");
    }
    return res.json();
}

export default function UserBookingPage() {
    const { data: session, status } : { data: any, status: string} = useSession();
    const router = useRouter();
    const [cars, setCars] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const toggleModal = () => {
        setAddModal(!addModal)
    }

    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/auth/sign-in');
        }
    }, [router, status, session?.user.role]);

    // Add Booking
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true)
        const res = await fetch(`/api/booking/new`, {
            method: 'POST',
            body: JSON.stringify({
                carName: e.target.carName.value,
                carId: e.target.carId.value,
                userName: e.target.userName.value,
                userId: e.target.userId.value,
                hari: e.target.hari.value,
                tipe: e.target.tipe.value,
                tanggal: e.target.tanggal.value
            })
        })

        if (res.status === 200) {
            e.target.reset();
            setIsLoading(false)
            setMessage("Booking berhasil, silahkan tunggu beberapa waktu sebelum direspon")
        } else {
            setMessage("Whoops.. terjadi eror")
            setIsLoading(false);
        }
    }

    // Fetch Car Data
    const fetchData = async () => {
        try {
            const data = await getCarData()
            setCars(data.data)
        } catch (error) {
            console.error("Terjadi error dalam mengambil data: ", error)
        }
    }
    useEffect(() => {
        fetchData()
    })

    return (
        <>
            <head></head>
            <div className="flex gap-1 mb-2">
                <div className="text-2xl font-bold">My Booking</div>
                <button 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2 ml-2 flex"
                    onClick={toggleModal}
                    >
                    <IoMdAddCircle className="text-white mr-1 mt-1" />Booking Sekarang!
                </button>
            </div>
            
            {addModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="font-semibold ml-4 mt-2 text-xl">
                    Booking Form
                </div> 
                {cars.length > 0 && (
                    <div className="p-4"> {/* Add padding to the inner content */}
                    {cars.map((car: any) => (
                        <form key={car.id} onSubmit={handleSubmit}>
                        {/* Automatic Input */}
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            className="hidden"
                            defaultValue={session.user.username}
                            disabled
                        />
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            className="hidden"
                            defaultValue={session.user.id}
                            disabled
                        />

                        {/* Car Selection */}
                        <div className="mb-4">
                            <label htmlFor="carName" className="block text-gray-700 font-bold mb-2">
                            Nama Mobil:
                            </label>
                            <select
                            id="carName"
                            name="carName"
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                            <option value="">Pilih Mobil</option>
                            <option value={car.mobil}>{car.mobil}</option>
                            </select>
                        </div>

                        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="">
                                <label htmlFor="tipe" className="block text-gray-700 font-bold mb-2">
                                Jenis Peminjaman:
                                </label>
                                <select
                                id="tipe"
                                name="tipe"
                                required
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                >
                                <option value="">Pilih Jenis Peminjaman</option>
                                <option value="Peminjaman Lepas Kunci">Peminjaman Lepas Kunci</option>
                                <option value="Peminjaman Dengan Driver">Peminjaman Dengan Driver</option>
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="hari" className="block text-gray-700 font-bold mb-2">
                                Berapa Hari:
                                </label>
                                <input
                                    type="number"
                                    id="hari"
                                    name="hari"
                                    placeholder="Total Hari"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                />
                            </div>
                        </div>

                        <div className="mb-4 grid grid-cols-1 md:grid-cols-1 gap-2">
                            <div className="">
                                <label htmlFor="tanggal" className="block text-gray-700 font-bold mb-2">
                                Tanggal Kapan Mau Dipakai:
                                </label>
                                <input
                                    type="date"
                                    id="tanggal"
                                    name="tanggal"
                                    placeholder="Tanggal Pemakaian"
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                />
                            </div>
                        </div>

                        {/* Confirmation Selection */}
                        <div className="mb-4">
                            <label htmlFor="carId" className="block text-gray-700 font-bold mb-2">
                            Konfirmasi Mobil:
                            </label>
                            <select
                            id="carId"
                            name="carId"
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            >
                            <option value="">Konfirmasi Pilih Mobil</option>
                            <option value={car.id}>{car.mobil}</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                            type="button"
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            onClick={() => setAddModal(false)}
                            >
                            Batal
                            </button>
                            <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                            type="submit"
                            disabled={isLoading}
                            >
                            {isLoading ? "Menyimpan..." : "Kirim"}
                            </button>
                        </div>
                        </form>
                    ))}
                    </div>
                )}
                </div>
            </div>
            )}

            {/* User Rules Booking */}
            <UserRulesBooking />

            {/* Another Rules */}
            <div className="-mt-2 text-red-600">
                Anda hanya dapat membuat satu booking dan dapat melakukannya lagi setelah di archive
            </div>

            {/* Message Succes or Fail Add New Data */}
            {message && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                    <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
                    <div className="relative bg-white p-8 rounded-lg shadow-lg animate__animated animate__bounceIn">
                        <p className="text-center text-lg mb-4">{message}</p>
                        <div className="text-center">
                            <button onClick={() => window.location.reload()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Confirm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Fetch User Booking Data */}
            <MyBookingUserLayout />
       </>
    )
}