'use client'

// Import Package
import { useState, useEffect } from "react"

// Icon
import { RiCustomerService2Fill } from "react-icons/ri";

// Fetching
async function getBookingData() {
    const res = await fetch(`/api/booking/admin/manage`)
    if (!res.ok) {
        throw new Error("Could not load data")
    }
    return res.json()
}

// Booking Data List
type Booking = {
    nextStep: string,
    status: string,
}

export default function AdminButtonManage() {
    // Delete Punya
    const [booking, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [messageDelete, setMessageDelete] = useState('')
    const [formData, setFormData] = useState<Booking | null>(null)

    // Toggle Modal
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal)
    }

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

    // Edit Data
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`/api/booking/admin/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            setMessageDelete("Succes to Updating Data")
            if (!res.ok) {
                throw new Error('Failed to Update');
            }
        } catch (error) {
            console.error("Failed: ", error)
            setMessageDelete("Failed to Updating Data")
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

    return (
        <>
            <div className="text-2xl">
                <button onClick={toggleModal}><RiCustomerService2Fill /></button>
            </div>
            
            {modal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-y-auto">
                    <div className="font-bold text-xl text-center py-4 border-b border-gray-200">
                        RESPON BOOKING CUSTOMER
                    </div>
                    <form onSubmit={handleSubmit} className="p-4">
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
                                <option value="Pending">Pending</option>
                                <option value="Accept">Accept</option>
                                <option value="Denied">Denied</option>
                            </select>
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
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        </>
    )
}