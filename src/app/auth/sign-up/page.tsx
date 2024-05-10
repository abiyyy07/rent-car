"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authServices } from "@/services/auth/route";

export default function SignUpPage() {
    const router = useRouter();
    const [message, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true)
        const res = await fetch("/api/auth/register", {
            method: 'POST',
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value,
                username: e.target.username.value,
                birthday: e.target.birthday.value,
                phone: e.target.phone.value,
                address: e.target.address.value,
            })
        })

        if (res.status === 200) {
          e.target.reset();
          setIsLoading(false)
        } else {
          setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-600">
            <div className="max-w-md w-full px-4 py-8 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input type="email" id="email" name="email" required className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" name="password" required className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input type="text" id="username" name="username" required className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="birthday" className="block text-gray-700">Birthday</label>
                        <input type="date" id="birthday" name="birthday" required className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-gray-700">Phone</label>
                        <input type="tel" id="phone" name="phone" required className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-gray-700">Address</label>
                        <input type="text" id="address" name="address" required className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        {isLoading ? "Loading..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    )
}