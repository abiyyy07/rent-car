'use client'

import { useState } from "react"

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

export default function AdminEditCarsLayout(id: any) {
    const [cars, setCars] = useState<Car | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<Car | null>(null)
    const [editMessage, setEditMessage] = useState('')
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const toggleEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen)
    }

    {/* Edit Function */}
    const editCar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch(`/api/car/detail/editCar/${id}`, {
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg w-1/2">
                        <form onSubmit={editCar} className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="mb-4 mr-1 ml-1">
                                    <label htmlFor="mobil" className="block font-semibold">
                                        Mobil
                                    </label>
                                    <input
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
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="mb-4 mr-1 ml-1">
                                    <label htmlFor="jumlah" className="block font-semibold">
                                        Jumlah
                                    </label>
                                    <input
                                    type="number"
                                    id="jumlah"
                                    name="jumlah"
                                    value={formData?.jumlah || ''}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:border-black focus:ring-2"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-4">
                            </div>
                        </form>
                    </div>
                </div>
    )
}