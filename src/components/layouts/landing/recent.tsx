'use client'

import { useState, useEffect } from "react"
import Link from "next/link"

async function getData(page: number) {
    const res = await fetch(`/api/home/recent?page=${page}`)

    if (!res.ok) {
        throw new Error("Failed to Fetch Data")
    }

    return res.json()
}

export default function ComponentRecentLandingPage() {
    const [cars, setCars] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async (page: number) => {
        try {
            const data = await getData(page);
            setCars(data.data);
            setTotalPages(data.totalPages);
        } catch {
            console.error("Error fetching data");
        }
    }

    useEffect(() => {
        fetchData(currentPage)
    }, [currentPage])

    return (
        <>
            <div className="flex flex-col items-center mt-6 mb-6 bg-gray-800">
                <h2 className="font-semibold text-3xl mb-2 mt-5 bg-white text-gray-800 px-5 py-1">Car List</h2>
                <div className="flex justify-center flex-wrap">
                    {cars.length > 0 &&
                        cars.map((car: any) => (
                            <div key={car.id} className="bg-white rounded-lg shadow-md p-4 m-2 flex flex-col mb-6">
                                <Link href={`/mobil/${car.id}`}>
                                    <img 
                                        src={car.imageurl} 
                                        alt={car.mobil} 
                                        className="w-full h-40 object-cover rounded-t-lg md:h-auto md:rounded-none md:w-64"
                                    />
                                    <div className="mt-2 flex-grow">
                                        <p className="text-xl font-bold overflow-hidden overflow-ellipsis whitespace-nowrap max-w-64 text-gray-700">{car.mobil}</p>
                                        <p className="bg-orange-600 p-1 rounded-md inline-block font-semibold text-white mt-1">{car.brand}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}