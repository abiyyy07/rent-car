'use client'

import { useState, useEffect } from "react"
import Link from "next/link"

import Pagination from "@/components/layouts/pagination"

async function getData() {
    const res = await fetch(`/api/car/show`)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default function MobilPage() {
    const [cars, setCars] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    {/* Fetch data */}
    const fetchData = async (page: Number) => {
        try {
            const data = await getData()
            setCars(data.data)
            setTotalPages(data.totalPages)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData(currentPage)
    }, [currentPage])

    return (
        <>
            <head></head>
            <div className="flex justify-center">
                {cars.length > 0 &&
                    cars.map((car: any) => (
                        <div className="p-3 bg-gray-800 mt-20 mb-6 text-white" key={car.id}>
                            <div className="bg-white w-52">
                                <img src={car.imageurl} alt=""className="" />
                            </div>
                            <div className="font-semibold text-2xl">{car.mobil}</div>
                            <div className="text-orange-700 font-semibold">{car.brand}</div>
                            <div className="">Rp. {car.hargaLK}</div>
                            <div className="">Rp. {car.hargaD}</div>
                            <div className="flex mt-2">
                                <Link href="/home/user/booking" className="mr-1 font-semibold bg-green-500 hover:bg-green-600 py-1 px-2 text-black">Booking</Link>
                                <Link href={`/mobil/${car.id}`} className="mr-1 ml-1 font-semibold bg-blue-500 hover:bg-blue-600 py-1 px-2 text-black">Detail</Link>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}