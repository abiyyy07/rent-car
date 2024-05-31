'use client'

import { useState } from "react";

export default function DeleteAdminCarLayout() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [deleteMassage, setDeleteMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const toggleModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`/api/car/detail/deleteCar/`, {
                method: 'DELETE',
            })

            const data = await res.json()

            if (data.status === 200) {
                setDeleteMessage("Berhasil untuk menghapus data")
            } else {
                setDeleteMessage("Gagal untuk menghapus data")
            }
        } catch (error) {
            console.error("Terjadi masalah pada databse", error)
        }
    }

    return (
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
                        onClick={() => {
                            toggleModal();
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}