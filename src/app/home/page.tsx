'use client'

import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function HomePage() {
    const router = useRouter();
    const { data: session, status } : {data: any, status: string} = useSession()
    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/auth/sign-in');
        } else {
            if (session?.user.role === 'admin'){
                router.push('/home/admin')
            } else {
                router.push('/home/user')
            }
        }
    }, [router, status, session?.user.role]);
    return (
        <div className="">
            <button onClick={() => signOut()}>SIGNOUT</button>
        </div>
    )
}