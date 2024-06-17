'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { RiCustomerService2Fill } from "react-icons/ri";
import { LuArchiveRestore } from "react-icons/lu";

// Fetch Detail Data
async function getDetailData(id: string) {
    const res = await fetch(`/api/booking/admin/manage/detail/${id}`)
    if (!res.ok) {
        throw new Error("Ada gangguan di server")
    }
    return res.json();
}

interface ArchiveButtonProps {
    bookingId: string;
  }

type Booking = {
    userName: string,
    userId: string,
    carId: string,
    carName: string,
    tipe: string,
    hari: string,
    tanggal: string,
    nextStep: string,
    status: string,
    createAt: string,
    updatedAt: string,
    updatedBy: string,
}

export default function AdminManageBookingDetail({params}: {params: {id: string}},) {
    const { data: session, status } : { data: any, status: string} = useSession();
    const router = useRouter()
    const [bookings, setBookings] = useState<Booking | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [messageArchive, setMessageArchive] = useState('')
    const [formData, setFormData] = useState<Booking | null>(null)

    // Redirect
    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/auth/sign-in');
        }
    }, [router, status, session?.user.role]);

    // Booking UpdatedBy
    const responder = session?.user?.username

    // Date Now
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toDateString();
        setCurrentDate(formattedDate);
    }, []);

    // Toggle Modal
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal)
    }

    // Toggle Modal Delete
    const [modalArchive, setModalArchive] = useState(false)
    const toggleModalDelete = () => {
        setModalArchive(!modalArchive)
    }

    // Fetching Data
    const fetchData = async () => {
        try {
            const data = await getDetailData(params.id)
            setBookings(data.data)
        } catch (error){
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    {/* Edit Function */}
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const now = new Date();
            const formattedDate = now.toDateString();
            const updatedFormData = {
                ...formData,
                updatedAt: formattedDate,
                updatedBy: responder,
            };
            const response = await fetch(`/api/booking/admin/manage/edit/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData)
            })
            if (!response.ok) {
                throw new Error('Failed to update data');
            }
            setMessageArchive("Data successfully changed")
            setIsLoading(false)
        } catch (error) {
            console.error("Failed to edit data: ", error)
            setMessageArchive("Failed to change data")
        } finally {
            setIsLoading(false)
            setModal(false)
        }
    }
    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...(prevData as Booking),
            [name]: value
        }))
    }
    
    // Handle Archive
    const handleArchive = async () => {
        if (!params.id) return; // Check if params.id is available

        setIsLoading(true);

        try {
            const response = await fetch(`/api/booking/admin/manage/archive/${params.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookingId: params.id }), // Use params.id here
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setMessageArchive("Berhasil melakukan Archive");
        } catch (error: any) {
            setMessageArchive(error.message);
        } finally {
            setModalArchive(false)
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex gap-2">
                <div className="text-2xl">
                    <button onClick={toggleModal} className="flex bg-[#053B50] hover:bg-[#303d42] px-2 py-1 font-semibold text-white">
                        <div className=""><RiCustomerService2Fill className="mr-2 mt-1"/></div>
                        <div className="">Respon Customer</div>
                    </button>
                </div>
                <div className="text-2xl">
                    <button onClick={toggleModalDelete} className="flex bg-orange-600 hover:bg-orange-700 px-2 py-2 font-semibold text-white">
                        <div className=""><LuArchiveRestore /></div>
                    </button>
                </div>
            </div>
            
            {modal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-y-auto">
                    <div className="font-bold text-xl text-center py-4 border-b border-gray-200">
                        RESPON BOOKING CUSTOMER
                    </div>
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="mb-4 flex text-xl">
                            <label htmlFor="status" className="block font-semibold mb-1 mr-2 mt-2">
                                Status:
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData?.status}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            >
                                <option value="" disabled>Select</option>
                                <option value="Pending">Pending</option>
                                <option value="Accept">Accept</option>
                                <option value="Denied">Denied</option>
                            </select>
                        </div>
                        <div className="mb-4 flex text-xl">
                            <label htmlFor="nextStep" className="block font-semibold mb-1 mr-2 mt-2">
                                Langkah Selanjutnya:
                            </label>
                            <select
                                id="nextStep"
                                name="nextStep"
                                value={formData?.nextStep}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            >
                                <option value="" disabled>Select</option>
                                <option value="Booking anda dipending, dikarenakan armada sedang tidak tersedia">Booking anda dipending, dikarenakan armada sedang tidak tersedia</option>
                                <option value="Booking anda diterima, silahkan datang dan melakukan pembayaran">Booking anda diterima, silahkan datang dan melakukan pembayaran</option>
                                <option value="Booking anda ditolak karena tidak memenuhi persyaratan">Booking anda ditolak karena tidak memenuhi persyaratan</option>
                            </select>
                        </div>
                        <div className="mb-4 flex text-xl">
                            <input
                                type="text"
                                id="updatedAt"
                                name="updatedAt"
                                className="hidden"
                                value={currentDate}
                                defaultValue={currentDate}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="mb-4 flex text-xl">
                            <input
                                type="text"
                                id="updatedBy"
                                name="updatedBy"
                                className="hidden"
                                value={responder}
                                defaultValue={responder}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setModal(false)}
                            >
                                Kembali
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {isLoading ? 'Changing..' : 'Change'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            )}

            {modalArchive && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-y-auto">
                        <div className="font-bold text-xl text-left py-4 px-6 border-b border-gray-200">
                            <p className="text-gray-700">
                                Apakah kamu yakin untuk me-archive booking atas nama <span className="font-semibold">{bookings?.userName}</span> yang membooking <span className="font-semibold">{bookings?.carName}</span>?
                            </p>
                        </div>
                        <form className="p-6">
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline"
                                    onClick={() => setModalArchive(false)}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline"
                                >
                                    {isLoading ? 'Archiving...' : 'Archive'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {bookings && (
                <div className="bg-white shadow-md rounded-lg p-6 space-y-4 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <span className="font-bold">Nama Pengguna:</span>
                            <p className="text-gray-700">{bookings.userName}</p>
                        </div>
                        <div>
                            <span className="font-bold">ID Pengguna:</span>
                            <p className="text-gray-700">{bookings.userId}</p>
                        </div>
                        <div>
                            <span className="font-bold">Nama Mobil:</span>
                            <p className="text-gray-700">{bookings.carName}</p>
                        </div>
                        <div>
                            <span className="font-bold">Tipe Mobil:</span>
                            <p className="text-gray-700">{bookings.tipe}</p>
                        </div>
                        <div>
                            <span className="font-bold">Hari Booking:</span>
                            <p className="text-gray-700">{bookings.hari}</p>
                        </div>
                        <div>
                            <span className="font-bold">Tanggal Dibuat:</span>
                            <p className="text-gray-700">{bookings.createAt}</p>
                        </div>
                        <div>
                            <span className="font-bold">Tanggal Diperbarui:</span>
                            <p className="text-gray-700">{bookings.updatedAt}</p>
                        </div>
                        <div>
                            <span className="font-bold">Tanggal Pemakaian:</span>
                            <p className="text-gray-700">{bookings.tanggal}</p>
                        </div>
                        <div>
                            <span className="font-bold">Langkah Selanjutnya:</span>
                            <p className="text-gray-700">{bookings.nextStep}</p>
                        </div>
                        <div>
                            <span className="font-bold">Status:</span>
                            <p className={`font-semibold 
                                ${bookings.status === 'Pending' ? 'text-orange-500' : 
                                bookings.status === 'Accept' ? 'text-green-500' : 
                                bookings.status === 'Denied' ? 'text-red-500' : ''}`}>
                                {bookings.status}
                            </p>
                        </div>
                        <div>
                            <span className="font-bold">Direspon oleh:</span>
                            <p className="text-gray-700">{bookings.updatedBy}</p>
                        </div>
                    </div>
                </div>
            )}

            {modalArchive && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-y-auto">
                        <div className="font-bold text-xl text-left py-4 px-4 border-b border-gray-200">
                            Confirmation Archive
                        </div>
                        <div className="p-4 text-left">
                            <p>Are you sure you want to archive this booking?</p>
                        </div>
                        <div className="flex justify-end space-x-4 p-4">
                            <button
                                type="button"
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setModalArchive(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={handleArchive}
                            >
                                {isLoading ? 'Archiving..' : 'Archive'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {messageArchive && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                    <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
                    <div className="relative bg-white p-8 rounded-lg shadow-lg animate__animated animate__bounceIn">
                        <p className="text-center text-lg mb-4">{messageArchive}</p>
                        <div className="text-center">
                            <Link href="/home/admin/booking/manage" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Afirmative</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}