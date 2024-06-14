'use client'

// Import Component Package
import { useState } from "react"

// Import Icon
import { IoMdAlert } from "react-icons/io";

export default function UserRulesBooking() {
    // Button
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal)
    }
    return (
        <div className="mb-2">
            <div className="text-red-600 font-semibold text-xl underline">
                <button onClick={toggleModal} className="flex"><IoMdAlert className="mt-1 mr-1" /> Peraturan</button>
            </div>

            {modal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-full overflow-y-auto">
                    <div className="font-semibold ml-4 mt-2 mb-2 text-xl text-red-600">
                        Peraturan Booking
                    </div>
                    <div className="mt-2 ml-4 mr-4">
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <strong>Persyaratan Umum:</strong> Penyewa harus berusia minimal 21 tahun dan memiliki SIM A yang masih berlaku.
                            </li>
                            <li>
                                <strong>Dokumen yang Diperlukan:</strong> Kartu Identitas (KTP/SIM/Paspor), SIM A asli, Kartu kredit atau dokumen jaminan lain yang disetujui.
                            </li>
                            <li>
                                <strong>Durasi Sewa:</strong> Pengembalian sesuai. Keterlambatan pengembalian dikenakan biaya tambahan per jam.
                            </li>
                            <li>
                                <strong>Pembayaran:</strong> Pembayaran dapat dilakukan secara cash saat akan mengambil mobil yang sudah dibooking jika status disetujui.
                            </li>
                            <li>
                                <strong>Penggunaan Mobil:</strong> Hanya untuk keperluan pribadi, tidak untuk disewakan kembali atau digunakan untuk kegiatan ilegal. Penyewa bertanggung jawab atas kerusakan selama masa sewa. Dilarang merokok di dalam mobil.
                            </li>
                            <li>
                                <strong>Pengisian Bahan Bakar:</strong> Mobil diserahkan dengan tangki penuh dan harus dikembalikan dalam kondisi yang sama. Biaya pengisian akan dikenakan jika tidak penuh.
                            </li>
                            <li>
                                <strong>Kebersihan Mobil:</strong> Mobil harus dikembalikan dalam kondisi bersih. Biaya pembersihan akan dikenakan jika mobil dikembalikan dalam kondisi kotor.
                            </li>
                            <li>
                                <strong>Asuransi:</strong> Semua mobil dilengkapi dengan asuransi dasar. Penyewa dapat memilih asuransi tambahan.
                            </li>
                            <li>
                                <strong>Pembatalan:</strong> Harus dilakukan minimal 24 jam sebelum waktu pengambilan untuk pengembalian uang penuh. Pembatalan dalam waktu kurang dari 24 jam dikenakan biaya.
                            </li>
                            <li>
                                <strong>Kerusakan dan Kehilangan:</strong> Segera laporkan ke perusahaan rental. Penyewa bertanggung jawab atas biaya perbaikan atau penggantian yang tidak tercakup oleh asuransi.
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4 space-x-4 ml-4 mb-2">
                        <button
                            type="button"
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            onClick={() => setModal(false)}
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            </div>
        )}

        </div>
    )
}