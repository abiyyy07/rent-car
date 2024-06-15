import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
        const dataCarBooking = await retrieveDataById('bookings', id);
        if (dataCarBooking) {
            return NextResponse.json({
                status: 200,
                message: 'Successfully retrieved user data',
                data: dataCarBooking,
            });
        }

        return NextResponse.json({
            status: 404,
            message: "Not Found",
            data: {}
        });
    }

    const bookings = await retrieveData('bookings');

    return NextResponse.json({ status: 200, statusCode: 200, message: 'Success Fetch Data', data: bookings });
}
