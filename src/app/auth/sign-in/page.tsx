"use client"

import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from 'next/link';

const SignInPage = () => {
    const { push } = useRouter();
    const router = useRouter()
    const { data: session, status } : { data: any, status: string} = useSession();
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(status === 'authenticated'){
            router.push('/home');
        }
    }, [router, status, session?.user.role]);

    const handleSubmit = async (e:any) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: e.target.email.value,
                password: e.target.password.value,
                callbackUrl: '/home',
            })
            if (!res?.error) {
                push("/authenticated");
              } else {
                console.log(res)
                if(res.status === 401) {
                  setError("Email atau Password salah")
                }
              }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <head>
                <title>RentCar - Sign In</title>
            </head>
            <div className="max-w-md w-full px-4 py-8 bg-white shadow-md rounded-md">
                {error !== '' && <div className="flex-col text-red-600 font-bold text-xl">{error}</div>}
                <h2 className="text-2xl font-bold mb-4">Welcome, lets sign in</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                    Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">
                    Password
                    </label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 mt-1 text-gray-800 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                    />
                </div>
                <button
                disabled={isLoading}
                    type="submit"
                    onSubmit={(e) => handleSubmit(e)}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    {isLoading ? "Loading..." : "Sign in"}
                </button>
                <div className="flex mt-4 justify-start">
                    <p className="mr-2">Does not have account?</p>
                    <Link href="/auth/sign-up" className="text-blue-600 underline">create account</Link>
                </div>
                </form>
            </div>
        </div>
    )
}

export default SignInPage;