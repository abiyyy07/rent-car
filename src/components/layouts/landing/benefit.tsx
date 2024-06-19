'use client'

import { useState } from "react"

import { FaCar, FaMoneyBillWave } from 'react-icons/fa';
import { RiCustomerService2Line } from "react-icons/ri";

export default function ComponentBenefitLandingPage() {
    const [carModals, setCarModals] = useState(false)
    const toggleCarModals = () => {
        setCarModals(!carModals)
    }

    const [moneyModals, setMoneyModals] = useState(false)
    const toggleMoneyModal = () => {
        setMoneyModals(!moneyModals)
    }

    const [responModals, setResponModals] = useState(false)
    const toggleResponModals = () => {
        setResponModals(!responModals)
    }
    
    return (
        <>
            <div className="bg-white py-8">
                <div className="text-center mb-4">
                    <h3 className="font-bold text-2xl text-black">Keuntungan Menyewa Dari Kami</h3>
                </div>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
                            <FaCar size={40} className="mb-2 text-white"/>
                            <h3 className="text-xl font-bold mb-2 text-white">Jenis Mobil</h3>
                            <p className="text-gray-200 font-semibold text-center">Tersedia berbagai macam mobil, dari tipe Sedan, SUV dll. Dan juga tersedia berbagi merek.</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
                            <FaMoneyBillWave size={40} className="mb-2 text-white"/>
                            <h3 className="text-xl font-bold mb-2 text-white">Biaya Terjangkau</h3>
                            <p className="text-gray-200 font-semibold text-center">Biaya yang sangat terjangkau, jadi tidak pusing memikirkan biaya</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
                            <RiCustomerService2Line size={40} className="mb-2 text-white"/>
                            <h3 className="text-xl font-bold mb-2 text-white">Fast Respon</h3>
                            <p className="text-gray-200 font-semibold text-center">Respon booking cepat, anda tidak perlu lama menunggu untuk menyewa armada</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}