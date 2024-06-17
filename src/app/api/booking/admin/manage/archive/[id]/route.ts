import { NextRequest, NextResponse } from "next/server";
import { copyDoc } from "@/lib/firebase/service";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(request: NextRequest, {params}: {params: {id: string}}) {
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
    
    try {
        const {id} = params
    
        if (!id) {
            return NextResponse.json({ status: 400, message: 'Missing document ID' });
        }

        await copyDoc(id);
    
        return NextResponse.json({ status: 200, message: 'Document copied successfully' });

        } catch (error) {
            console.error('Error copying document:', error);
            return NextResponse.json({ status: 500, message: 'Internal Server Error' });
    }
}