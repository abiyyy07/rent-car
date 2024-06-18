'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { FaTrashAlt } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import Link from "next/link";

// Fetch Detail Data
async function getDetailData(id: string) {
    const res = await fetch(`/api/booking/admin/manage/archive/manage/${id}`)
    if (!res.ok) {
        throw new Error("Ada gangguan di server")
    }
    return res.json();
}

type Archive = {
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

export default function AdminBookingArchiveManagePage({params}: {params: {id: string}}) {
    const { data: session, status } : { data: any, status: string} = useSession();
    const router = useRouter()
    const [archives, setArchives] = useState<Archive | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // Delete useState
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isDeleteMassage, setDeleteMessage] = useState('')
    const toggleModalDelete = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    // Fetching Data
    const fetchData = async () => {
        try {
            const data = await getDetailData(params.id)
            setArchives(data.data)
        } catch (error){
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    // Handle Delete
    const handleDelete = async () => {
        setIsLoading(false)
        try {
            const res = await fetch(`/api/booking/admin/manage/archive/delete/${params.id}`, {
                method: 'DELETE',
            })

            const data = await res.json()

            if (data.status === 200) {
                setDeleteMessage("Berhasil untuk menghapus data")
            } else {
                setDeleteMessage("Gagal untuk menghapus data")
                console.error("Failed to Delete Data: ", data.message)
            }
        } catch (error) {
            console.error("Terjadi masalah pada databse", error)
        }
    }

    return (
        <>
            <head>
                <title>Archive Manage</title>
            </head>

            <div className="font-bold text-xl text-gray-500">
                <h1>Archive Manage</h1>
            </div>

            <div className="">
                {archives && (
                    <div className="bg-white rounded-lg space-y-4 mt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <span className="font-bold">Nama Pengguna:</span>
                                <p className="text-gray-700">{archives.userName}</p>
                            </div>
                            <div>
                                <span className="font-bold">ID Pengguna:</span>
                                <p className="text-gray-700">{archives.userId}</p>
                            </div>
                            <div>
                                <span className="font-bold">Nama Mobil:</span>
                                <p className="text-gray-700">{archives.carName}</p>
                            </div>
                            <div>
                                <span className="font-bold">Tipe Mobil:</span>
                                <p className="text-gray-700">{archives.tipe}</p>
                            </div>
                            <div>
                                <span className="font-bold">Hari Booking:</span>
                                <p className="text-gray-700">{archives.hari}</p>
                            </div>
                            <div>
                                <span className="font-bold">Tanggal Dibuat:</span>
                                <p className="text-gray-700">{archives.createAt}</p>
                            </div>
                            <div>
                                <span className="font-bold">Tanggal Diperbarui:</span>
                                <p className="text-gray-700">{archives.updatedAt}</p>
                            </div>
                            <div>
                                <span className="font-bold">Tanggal Pemakaian:</span>
                                <p className="text-gray-700">{archives.tanggal}</p>
                            </div>
                            <div>
                                <span className="font-bold">Langkah Selanjutnya:</span>
                                <p className="text-gray-700">{archives.nextStep}</p>
                            </div>
                            <div>
                                <span className="font-bold">Status:</span>
                                <p className={`font-semibold 
                                    ${archives.status === 'Pending' ? 'text-orange-500' : 
                                    archives.status === 'Accept' ? 'text-green-500' : 
                                    archives.status === 'Denied' ? 'text-red-500' : ''}`}>
                                    {archives.status}
                                </p>
                            </div>
                            <div>
                                <span className="font-bold">Direspon oleh:</span>
                                <p className="text-gray-700">{archives.updatedBy}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end mt-4 mr-2">
                <button onClick={toggleModalDelete}><FaTrashAlt className="text-5xl bg-red-500 hover:bg-red-600 text-white p-2" /></button>
            </div>

            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg w-1/2">
                        <div className="font-bold text-xl text-left py-4 px-4 border-b border-gray-200">
                            Confirmation Delete
                        </div>
                        <div className="p-4 text-left">
                            <p className="text-xl">Apakah kamu yakin akan menghapus archive ini?</p>
                            <p className="text-red-600 underline flex"><GoAlertFill className="mt-1 mr-1"/>archive tidak dapat dipulihkan apabila sudah dihapus</p>
                        </div>
                        <div className="flex justify-end space-x-4 p-4">
                            <button
                                type="button"
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                disabled={isLoading}
                                onClick={handleDelete}
                            >
                                {isLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteMassage && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg w-1/2">
                        <div className="font-bold text-xl text-center py-4 px-4 border-gray-200">
                            {isDeleteMassage}
                        </div>
                        <div className="flex justify-center space-x-4 p-1">
                            <Link href="/home/admin/booking/archive" className="bg-blue-600 hover:bg-blue-700 px-2 py-1 text-white font-semibold">OKE</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}