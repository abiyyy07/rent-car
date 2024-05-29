'use client'

import { useState } from "react"
import { useEffect } from "react"

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
    const [messageDelete, setMessageDelete] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

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

    return (
        <div className="p-1">
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
                            <p className="font-semibold">Harga per Hari:</p>
                            <p>{cars.hargaD}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Harga per 12 Jam:</p>
                            <p>{cars.hargaLK}</p>
                        </div>
                        </div>
                        <div className="mt-4">
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                            onClick={toggleModal}
                        >
                            Delete
                        </button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
                    <p>Are you sure you want to delete this car?</p>
                    <div className="mt-4 flex justify-end space-x-4">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={toggleModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={() => {
                        // Add delete functionality here
                        setMessageDelete("Car has been deleted.");
                        toggleModal();
                        }}
                    >
                        Delete
                    </button>
                    </div>
                </div>
                </div>
            )}

        </div>
    )
}