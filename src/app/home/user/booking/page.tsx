'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

import { IoMdAddCircle } from "react-icons/io";

async function getCarData() {
    const res = await fetch(`/api/car/show/booking`)
    if (!res.ok) {
        throw new Error("Error to fetch data")
    }
    return res.json()
}

export default function UserBookingPage() {
    const { data: session, status } : { data: any, status: string} = useSession();
    const [cars, setCars] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const toggleModal = () => {
        setAddModal(!addModal)
    }

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
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const data = await getCarData();
            setCars(data.data);
        } catch {
            console.error("Error fetching data");
        }
    }

    return (
       <>
        <head></head>
        <div className="flex gap-1">
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
                        <option value={car.id}>{car.mobil}</option>
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
       </>
    )
}