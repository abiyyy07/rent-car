import { NextResponse, NextRequest } from "next/server";
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
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
    
    const {searchParams} = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1
    const perPage = 25;

    const start = (page - 1) * perPage
    const end = start + perPage

    const users = await retrieveData("archive");
    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / perPage)

    const paginatedBeritas = users.slice(start, end)

    return NextResponse.json({
        status: 200,
        statusCode: 200,
        message: "Success fetch data",
        data: paginatedBeritas,
        totalPages,
    });
}