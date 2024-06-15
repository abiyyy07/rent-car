import { NextRequest, NextResponse } from "next/server";
import { updateData } from "@/lib/firebase/service";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function PUT(request: NextRequest, {params}: {params: {id: string}}, req: any) {
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
    const dataToUpdate = await request.json()

    if (id) {
        try {
            const res = await updateData('bookings', id, dataToUpdate)

            if (res) {
                return NextResponse.json({
                    status: 200,
                    statusCode: 200,
                    message: "Success updating data"
                })
            } else {
                return NextResponse.json({
                    status: 404,
                    statusCode: 404,
                    message: "Failed to find user"
                })
            }
        } catch (error) {
            console.error("error: ", error)
            return NextResponse.json({
                status: 500,
                statusCode: 500,
                message: "Failed to update"
            })
        }
    } else {
        return NextResponse.json({
            status: 400,
            statusCode: 400,
            message: "No ID provided"
        })
    }
}