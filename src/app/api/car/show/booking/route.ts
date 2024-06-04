import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse, req: any) {

    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id")
    if (id) {
        const dataCarBooking = await retrieveDataById('cars', id)
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

    const bookings = await retrieveData('cars');
    
    return NextResponse.json({ status: 200, statusCode: 200, message: 'Success Fetch Data', data: bookings });
}