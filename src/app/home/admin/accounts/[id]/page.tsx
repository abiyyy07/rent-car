'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

type User = {
    username: string,
    email: string,
    birthday: string,
    phone: string,
    address: string,
    role: string,
}

async function getDetailData(id: string) {
    const res = await fetch(`/api/accounts/detail/${id}`)

    if (!res.ok) {
        throw new Error("Failed to Fetch Data");
    }
    
    return await res.json();
}

export default function DetailUserPage({params}: {params: {id: string}}) {
    const [users, setUsers] = useState<User | null>(null)

    const fetchData = async () => {
        try {
            const data = await getDetailData(params.id)
            setUsers(data.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="mx-auto bg-white rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">User Details</h2>
          {users && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="font-semibold">Email:</p>
                <p>{users.email}</p>
              </div>
              <div>
                <p className="font-semibold">Username:</p>
                <p>{users.username}</p>
              </div>
              <div>
                <p className="font-semibold">Birthday:</p>
                <p>{users.birthday}</p>
              </div>
              <div>
                <p className="font-semibold">Phone:</p>
                <p>{users.phone}</p>
              </div>
              <div>
                <p className="font-semibold">Address:</p>
                <p>{users.address}</p>
              </div>
              <div>
                <p className="font-semibold">Role:</p>
                <p>{users.role}</p>
              </div>
            </div>
          )}
        </div>
    );
}