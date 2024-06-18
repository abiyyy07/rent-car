import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(request: NextRequest, {params}: {params: {id: string}}, req: any) {
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

    const {id} = params;

    if (id) {
        const detailBooking = await retrieveDataById('archive', id)

        if (detailBooking) {
            return NextResponse.json({
                status: 200,
                message: 'Successfully retrieved booking data',
                data: detailBooking,
            });
        }

        return NextResponse.json({
            status: 404,
            message: "Not Found",
            data: {}
        });
    }

    const archives = await retrieveData('archive');
    return NextResponse.json({status: 200, statusCode: 200, message: 'Success Fetch Data', data: archives});
}