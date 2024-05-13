'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function CarAdminAddPage() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImageFile(files[0])
        }
    }

    return (
        <div className="">Car Add</div>
    )
}