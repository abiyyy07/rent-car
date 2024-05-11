import { NextResponse, NextRequest } from "next/server";
import { retrieveDataById, retrieveData } from "@/lib/firebase/service";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest, req: any) {
    const isAuthenticatedUser = await getServerSession(req)
    console.log(isAuthenticatedUser)

    if (!isAuthenticatedUser) {
      return NextResponse.json({
        status: 401,
        statusCode: 401,
        message: "You must be logged in as Admin first",
        data: "ERROR",
      })
    }

    const {searchParams} = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1
    const perPage = 25;

    const start = (page - 1) * perPage
    const end = start + perPage

    const users = await retrieveData("users");
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