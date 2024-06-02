'use client'

import { useState } from "react"
import { useEffect } from "react"
import Link from "next/link"

type Car = {
    mobil: string,
    brand: string,
    model: string,
    jumlah: string,
    tahun: string,
    transmisi: string,
    seat: string,
    hargaLK: string,
    hargaD: string,
    imageurl: string,
    timestamp: Date,
    updateAt: Date,
}

async function getDetailData(id: string) {
    const res = await fetch(`/api/car/detail/${id}`)
    if (!res.ok) {
        throw new Error("Ada gangguan di server")
    }
    return res.json();
}

export default function AdminDetailCarPage({params}: {params: {id: string}}) {
    const [cars, setCars] = useState<Car | null>(null)

    {/* Edit UseState */}
    const [formData, setFormData] = useState<Car | null>(null)
    const [editMessage, setEditMessage] = useState('')
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const toggleEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen)
    }

    {/* Delete UseState */}
    const [messageDelete, setMessageDelete] = useState('')
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isDeleteMassage, setDeleteMessage] = useState('')
    const toggleModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const [isLoading, setIsLoading] = useState(false)

    {/* Fetch Data */}
    const fetchData = async () => {
        try {
            const data = await getDetailData(params.id)
            setCars(data.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    {/* Delete */}
    const handleDelete = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`/api/car/detail/deleteCar/${params.id}`, {
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

    {/* Edit Function */}
    const editCar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch(`/api/car/detail/editCar/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                throw new Error('Failed to update data');
            }
            setEditMessage("Data successfully changed")
            setIsLoading(false)
        } catch (error) {
            console.error("Failed to edit data: ", error)
            setEditMessage("Failed to change data")
        } finally {
            setIsLoading(false)
            setIsEditModalOpen(false)
        }
    }
    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...(prevData as Car),
            [name]: value
        }))
    }

    return (
        <div className="p-1">
            {/* Main View */}
            {cars && (
                <div className="rounded-lg overflow-hidden">
                    <img src={cars.imageurl} alt={cars.mobil} className="h-64 object-cover" />
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4">{cars.mobil}</h2>
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold">Brand:</p>
                            <p>{cars.brand}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Model:</p>
                            <p>{cars.model}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Jumlah:</p>
                            <p>{cars.jumlah}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Tahun:</p>
                            <p>{cars.tahun}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Transmisi:</p>
                            <p>{cars.transmisi}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Seat:</p>
                            <p>{cars.seat}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Harga per Hari (No Driver):</p>
                            <p>{cars.hargaD}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Harga per Hari (With Driver):</p>
                            <p>{cars.hargaLK}</p>
                        </div>
                        </div>
                        <div className="mt-4">
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mr-2 ml-2"
                            onClick={toggleModal}
                        >
                            Delete
                        </button>
                        <button 
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 mr-2 ml-2"
                            onClick={toggleEditModal}
                        >
                            Edit
                        </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Pop Up */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg w-1/2">
                        <form onSubmit={editCar} className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="mb-4 mr-1 ml-1">
                                    <label htmlFor="mobil" className="block font-semibold">
                                        Mobil
                                    </label>
                                    <input
                                    placeholder={cars?.mobil}
                                    type="text"
                                    id="mobil"
                                    name="mobil"
                                    value={formData?.mobil || ''}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:border-black focus:ring-2"
                                    />
                                </div>
                                <div className="mb-4 mr-1 ml-1">
                                    <label htmlFor="brand" className="block font-semibold">
                                        Brand
                                    </label>
                                    <select
                                    id="brand"
                                    name="brand"
                                    value={formData?.brand || ''}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:border-black focus:ring-2"
                                    >
                                    <option value="" disabled selected>{cars?.brand}</option>
                                    <option value="Toyota">Toyota</option>
                                    <option value="Mitsubishi">Mitsubishi</option>
                                    <option value="Honda">Honda</option>
                                    <option value="Isuzu">Isuzu</option>
                                    <option value="McLaren">McLaren</option>
                                    <option value="Ferrari">Ferrari</option>
                                    </select>
                                </div>
                                <div className="mb-4 mr-1 ml-1">
                                    <label htmlFor="model" className="block font-semibold">
                                        Model
                                    </label>
                                    <select
                                    id="model"
                                    name="model"
                                    value={formData?.model || ''}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:border-black focus:ring-2"
                                    >
                                    <option value="" disabled selected>{cars?.model}</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Minivan">Minivan</option>
                                    <option value="Hatchback">Hatchback</option>
                                    <option value="Luxury">Luxury</option>
                                    <option value="Sports Car">Sports Car</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="mb-4 mr-1 ml-1">
                                    <label htmlFor="jumlah" className="block font-semibold">
                                        Jumlah
                                    </label>
                                    <input
                                    placeholder={cars?.jumlah}
                                    type="number"
                                    id="jumlah"
                                    name="jumlah"
                                    value={formData?.jumlah || ''}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:border-black focus:ring-2"
                                    />
                                </div>
                                <div className="mb-4 mr-1 ml-1">
                                    <label htmlFor="tahun" className="block font-semibold">
                                        Tahun
                                    </label>
                                    <input
                                    placeholder={cars?.tahun}
                                    type="text"
                                    id="tahun"
                                    name="tahun"
                                    value={formData?.tahun || ''}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:border-black focus:ring-2"
                                    />
                                </div>
                                <div className="mb-4 mr-1 ml-1">
                                    <label htmlFor="transmisi" className="block font-semibold">
                                        Transmisi
                                    </label>
                                    <select
                                    id="transmisi"
                                    name="transmisi"
                                    value={formData?.transmisi || ''}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:border-black focus:ring-2"
                                    >
                                    <option value="" disabled selected>{cars?.transmisi}</option>
                                    <option value="Automatic">Automatic</option>
                                    <option value="Manual">Manual</option>
                                    </select>
                                </div>
                                <div className="mb-4 mr-1 ml-1">
                                    <label htmlFor="seat" className="block font-semibold">
                                        Tempat Duduk
                                    </label>
                                    <input
                                    placeholder={cars?.seat}
                                    type="text"
                                    id="seat"
                                    name="seat"
                                    value={formData?.seat || ''}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:border-black focus:ring-2"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="mb-4 mr-1 ml-1">
                                    <label htmlFor="hargaLK" className="block font-semibold">
                                        Harga Lepas Kunci
                                    </label>
                                    <input
                                    placeholder={cars?.hargaLK}
                                    type="text"
                                    id="hargaLK"
                                    name="hargaLK"
                                    value={formData?.hargaLK || ''}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:border-black focus:ring-2"
                                    />
                                </div>
                                <div className="mb-4 mr-1 ml-1">
                                    <label htmlFor="hargaD" className="block font-semibold">
                                        Harga Dengan Driver
                                    </label>
                                    <input
                                    placeholder={cars?.hargaD}
                                    type="text"
                                    id="hargaD"
                                    name="hargaD"
                                    value={formData?.hargaD || ''}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:border-black focus:ring-2"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-4">
                            <button
                                type="button"
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "Updating" : "Update"}

                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Message */}
            {editMessage && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
                <div className="relative bg-white p-8 rounded-lg shadow-lg animate__animated animate__bounceIn">
                    <p className="text-center text-lg mb-4">{editMessage}</p>
                    <div className="text-center">
                        <button onClick={() => window.location.reload()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">OKE BOS</button>
                    </div>
                </div>
            </div>
            )}

            {/* Delete Pop up */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                        <p>Are you sure you want to delete this car data?</p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                type="button"
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={handleDelete}
                                disabled={isLoading}
                            >
                                {isLoading ? "Deleting..." : "Delete"}

                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PopUp Delete Massage */}
            {isDeleteMassage && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
                <div className="relative bg-white p-8 rounded-lg shadow-lg animate__animated animate__bounceIn">
                    <p className="text-center text-lg mb-4">{isDeleteMassage}</p>
                    <div className="text-center">
                        <Link href="/home/admin/car" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">ACC BOS</Link>
                    </div>
                </div>
            </div>
            )}

        </div>
    )
}