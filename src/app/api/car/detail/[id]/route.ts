import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest, {params}: {params: {id: string}}, req: any) {
    const {id} = params;

    if (id) {
        const detailCar = await retrieveDataById('cars', id)

        if (detailCar) {
            return NextResponse.json({
                status: 200,
                message: 'Successfully retrieved Car data',
                data: detailCar,
            });
        }

        return NextResponse.json({
            status: 404,
            message: "Not Found",
            data: {}
        });
    }

    const cars = await retrieveData('cars');
    return NextResponse.json({status: 200, statusCode: 200, message: 'Success Fetch Data', data: cars});
}