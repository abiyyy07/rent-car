import { deleteData } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
    const token = await getToken({ req: request, secret });
    
    if (!token) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized",
        });
    }

    if (token.role !== 'admin') {
        return NextResponse.json({
            status: 403,
            message: "Forbidden",
        });
    }

    const {id} = params
    if (id) {
        try {
            const result = await deleteData('archive', id)
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