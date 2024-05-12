import { NextRequest, NextResponse } from "next/server";
import { updateData } from "@/lib/firebase/service";
import { getServerSession } from "next-auth";

export async function PUT(request: NextRequest, {params}: {params: {id: string}}, req: any) {
    const session = await getServerSession(req)
    if (!session) {
        return NextResponse.json({
            statusCode: 401,
            status: 401,
            message: 'Unauthorized'
        })
    }
    
    const {id} = params
    const dataToUpdate = await request.json()

    if (id) {
        try {
            const res = await updateData('users', id, dataToUpdate)

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