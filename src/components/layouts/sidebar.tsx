import Link from "next/link"

export default function SidebarLayout() {
    return (
        <div className="bg-gray-800 h-screen w-48 text-white">
            <div className="flex flex-col justify-between h-full">
                <div className="py-4">
                <Link href="/admin/dashboard">
                    <a className="block px-4 py-2">Dashboard</a>
                </Link>
                <Link href="/admin/users">
                    <a className="block px-4 py-2">Users</a>
                </Link>
                {/* Tambahkan link admin lainnya jika diperlukan */}
                </div>
                <div className="py-4">
                <Link href="/">
                    <a className="block px-4 py-2">Logout</a>
                </Link>
                </div>
            </div>
        </div>
    )
}