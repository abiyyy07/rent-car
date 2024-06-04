import { NextRequest, NextResponse } from "next/server";
import { booking } from "@/lib/firebase/service";

export async function POST(request: NextRequest, response: NextResponse) {
    const reqData = await request.json();
    const res = await booking(reqData)
    return NextResponse.json(
        {status: res.status, message: res.message}, 
        {status: res.statusCode},
    );
}