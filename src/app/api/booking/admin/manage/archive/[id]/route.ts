import { NextResponse, NextRequest } from "next/server";
import { archiveBooking } from "@/lib/firebase/service";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params;
    if (id) {
        try {
            const result = await archiveBooking(id);

            if (result.success) {
                return NextResponse.json({
                    status: 200,
                    message: "Booking archived successfully",
                });
            } else {
                return NextResponse.json({
                    status: 404,
                    message: result.message,
                });
            }
        } catch (error) {
            return NextResponse.json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    } else {
        return NextResponse.json({
            status: 400,
            message: "Bad Request",
        });
    }
}

export async function handle(request: NextRequest, { params }: { params: { id: string } }) {
    switch (request.method) {
        case 'POST':
            return await POST(request, { params });
        default:
            return NextResponse.json({
                status: 405,
                message: "Method Not Allowed",
            });
    }
}
