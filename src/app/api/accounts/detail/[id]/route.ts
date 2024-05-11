import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest, {params}: {params: {id: string}}, req: any) {
    const {id} = params;

    if (id) {
        const detailUser = await retrieveDataById('users', id)

        if (detailUser) {
            return NextResponse.json({
                status: 200,
                message: 'Successfully retrieved user data',
                data: detailUser,
            });
        }

        return NextResponse.json({
            status: 404,
            message: "Not Found",
            data: {}
        });
    }

    const users = await retrieveData('users');
    return NextResponse.json({status: 200, statusCode: 200, message: 'Success Fetch Data', data: users});
}