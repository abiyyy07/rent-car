import { deleteData } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function DELETE(req: any, {params}: {params: {id: string}}) {
    const session = await getServerSession(req)
    if (!session) {
        return NextResponse.json({
            status: 405,
            statusCode: 405,
            message: 'You must be logged in as Admin'
        })
    }

    const {id} = params
    if (id) {
        try {
            const result = await deleteData('users', id)
            if (result) {
                return NextResponse.json({
                    status: 200,
                    statusCode: 200,
                    message: "Success to Deleting Data"
                })
            } else {
                return NextResponse.json({
                    status: 404,
                    statusCode: 404,
                    message: 'Data tidak ditemukan'
                });
            }
        } catch (error) {
            console.error('Error Delete Berita Data', error);
            return NextResponse.json({
                status: 500,
                statusCode: 500,
                message: 'Failed Request'
            });
        }
    }
}