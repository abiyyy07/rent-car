'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function CarAdminAddPage() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImageFile(files[0])

            // preview gambar
            const fileURL = URL.createObjectURL(files[0]);
            setImagePreview(fileURL);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('')

        const formData = new FormData(e.currentTarget)

        // Validasi data
        if (
            !formData.get("mobil") ||
            !formData.get("brand") ||
            !formData.get("model") ||
            !formData.get("jumlah") ||
            !formData.get("tahun") ||
            !formData.get("transmisi") ||
            !formData.get("seat") ||
            !formData.get("hargaLK") ||
            !formData.get("hargaD")
        ) {
            setIsLoading(false)
            return
        }

        if (imageFile) {
            formData.append('gambarMobil', imageFile)
        }

        try {
            const res = await fetch('/api/car/createCar', {
                method: 'POST',
                body: formData,
            });

            if (res.status === 200) {
                const data = await res.json();
                console.log('API Response:', data);
                setMessage("Data Berhasil Ditambahkan")
            } else {
                const data = await res.json();
                setError(data.message || 'Terjadi kesalahan');
            }
        } catch (error) {
            console.error('Error adding berita:', error);
            setError('Terjadi kesalahan data gagal diupload');
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <head>
                <title>Admin Create Car</title>
            </head>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="mb-4 mr-1 ml-1">
                        <label htmlFor="mobil" className="block text-gray-700 font-bold mb-2">
                            Nama Mobil:
                        </label>
                        <input
                            type="text"
                            id="mobil"
                            name="mobil"
                            placeholder="Nama mobil"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4 mr-1 ml-1">
                        <label htmlFor="brand" className="block text-gray-700 font-bold mb-2">
                            Nama brand mobil:
                        </label>
                        <select 
                            id="brand"
                            name="brand" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="" disabled selected>Select One</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Mitsubishi">Mitsubishi</option>
                            <option value="Honda">Honda</option>
                            <option value="Isuzu">Isuzu</option>
                            <option value="McLaren">McLaren</option>
                            <option value="Ferrari">Ferrari</option>
                        </select>
                    </div>
                    <div className="mb-4 mr-1 ml-1">
                        <label htmlFor="model" className="block text-gray-700 font-bold mb-2">
                            Model mobil:
                        </label>
                        <select 
                            id="model"
                            name="model" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="" disabled selected>Select One</option>
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
                    <div className="mb-4 ml-1 mr-1">
                        <label htmlFor="jumlah" className="block text-gray-700 font-bold mb-2">
                            Jumlah Unit Tersedia:
                        </label>
                        <input
                            type="number"
                            id="jumlah"
                            name="jumlah"
                            placeholder="Jumlah unit"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4 ml-1 mr-1">
                        <label htmlFor="tahun" className="block text-gray-700 font-bold mb-2">
                            Unit tahun:
                        </label>
                        <input
                            type="text"
                            id="tahun"
                            name="tahun"
                            placeholder="Tahun unit"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4 mr-1 ml-1">
                        <label htmlFor="tranmisi" className="block text-gray-700 font-bold mb-2">
                            Jenis transmisi:
                        </label>
                        <select 
                            id="transmisi"
                            name="transmisi" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="" disabled selected>Select One</option>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                    </div>
                    <div className="mb-4 ml-1 mr-1">
                        <label htmlFor="seat" className="block text-gray-700 font-bold mb-2">
                            Jumlah Tempat Duduk:
                        </label>
                        <input
                            type="text"
                            id="seat"
                            name="seat"
                            placeholder="Jumlah tempat duduk"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="mb-4 ml-1 mr-1">
                        <label htmlFor="hargaLK" className="block text-gray-700 font-bold mb-2">
                            Harga Rental Lepas Kunci:
                        </label>
                        <input
                            type="number"
                            id="hargaLK"
                            name="hargaLK"
                            placeholder="Harga lepas kunci (Contoh Rp. 100.000,00)"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4 ml-1 mr-1">
                        <label htmlFor="hargaD" className="block text-gray-700 font-bold mb-2">
                            Harga Rental dengan Driver:
                        </label>
                        <input
                            type="number"
                            id="hargaD"
                            name="hargaD"
                            placeholder="Harga dengan driver (Contoh Rp. 100.000,00)"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="gambarMobil" className="block text-gray-700 font-bold mb-2">
                        Gambar Mobil:
                    </label>
                    <input
                        type="file"
                        id="gambarMobil"
                        name="gambarMobil"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    {imagePreview && (
                        <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4">
                            <img src={imagePreview} alt="Preview" className="" width={300}/>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isLoading ? 'Loading...' : 'Tambah Mobil'}
                    </button>
                </div>
            </form>

            {/* Message success */}
            {message && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                  <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
                  <div className="relative bg-white p-8 rounded-lg shadow-lg animate__animated animate__bounceIn">
                      <p className="text-center text-lg mb-4">{message}</p>
                      <div className="text-center">
                        <Link href="/home/admin/car" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            OKE BOS
                        </Link>
                      </div>
                  </div>
              </div>
            )}

            {error && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                  <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
                  <div className="relative bg-white p-8 rounded-lg shadow-lg animate__animated animate__bounceIn">
                      <p className="text-center text-lg mb-4">{message}</p>
                      <div className="text-center">
                      <button
                        onClick={() => window.location.reload()}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Oke
                      </button>
                      </div>
                  </div>
              </div>
            )}
        </div>
    )
}