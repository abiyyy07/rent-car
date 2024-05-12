'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"

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
    const [formData, setFormData] = useState<User | null>(null)
    const [message, setMessage] = useState('');
    const [messageDelete, setMessageDelete] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

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

    const handleDelete = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/accounts/deleted/${params.id}`, {
          method: 'DELETE'
        })
        const data = await res.json()

        if (data.status === 200) {
          setMessageDelete("Success to Deleting Data")
        } else {
          setMessageDelete("Failed to Deleting Data")
          console.error("Failed to Delete Data: ", data.message)
        }
      } catch (error) {
        console.error("Failed to request deleting data: ", error)
      }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await fetch(`/api/accounts/edit/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            setMessage("Succes to Updating Data")
            if (!res.ok) {
                throw new Error('Failed to Update');
            }
        } catch (error) {
            console.error("Failed: ", error)
            setMessage("Failed to Updating Data")
        } finally {
            setIsLoading(false)
            setIsModalOpen(false)
        }
    }

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...(prevData as User),
            [name]: value
        }))
    }

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

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-md p-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="role" className="block font-semibold">
                      Role:
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData?.role}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                      <option value="" disabled>Select</option>
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-2"
                    >
                      {isLoading ? 'Updating' : 'Update'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {message && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                  <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
                  <div className="relative bg-white p-8 rounded-lg shadow-lg animate__animated animate__bounceIn">
                      <p className="text-center text-lg mb-4">{message}</p>
                      <div className="text-center">
                      <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Oke
                      </button>
                      </div>
                  </div>
              </div>
          )}

          {messageDelete && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
              <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
              <div className="relative bg-white p-8 rounded-lg shadow-lg animate__animated animate__bounceIn">
                <p className="text-center text-lg mb-4">{messageDelete}</p>
                <div className="text-center">
                  <Link href="/home/admin/accounts" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Back to Accounts
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button onClick={handleDelete} disabled={isLoading} className="px-4 py-2 mt-2 ml-1 mr-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              {isLoading ? "Deleting..." : "Delete"}
            </button>
            <button onClick={toggleModal} type="button" className="px-4 py-2 mt-2 ml-1 mr-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Edit Role
            </button>
          </div>
        </div>
    );
}