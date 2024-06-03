'use client'

import { useState, useEffect } from "react"
import Link from "next/link"

import { FaCopy } from "react-icons/fa";

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

export default function MobilDetailPage({params}: {params: {id: string}}) {
    const [cars, setCars] = useState<Car | null>(null)
    const [message, setMessage] = useState('')

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

    // Copy Clipboard
    const copyUrlToClipboard = () => {
        // Salin URL halaman ke clipboard
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            setMessage("URL berhasil disalin ke clipboard");
          })
          .catch((err) => {
            setMessage("URL Gagal disalin")
          });
    };

    return (
        <>
            <head></head>
            <div className="">
            {cars && (
                <div className="rounded-lg overflow-hidden mb-3">
                    <div className="flex items-center justify-center h-64 bg-gray-100">
                        <img src={cars.imageurl} alt={cars.mobil} className="h-full object-cover" />
                    </div>
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
                        <div className="mt-4 flex">
                            <Link href="/mobil" className="flex py-3 px-5 mr-2 bg-blue-600 hover:bg-blue-700 font-semibold text-white">Kembali ke Menu Mobil</Link>
                            <button onClick={copyUrlToClipboard} className="py-3 px-5 mr-2 bg-blue-600 hover:bg-blue-700 font-semibold text-white flex">
                                <FaCopy className="mr-2 mt-1" /> Copy & Share URL
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </>
    )
}