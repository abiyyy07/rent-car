import { register } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const reqData = await request.json();
    const res = await register(reqData)
    return NextResponse.json(
        {status: res.status, message: res.message}, 
        {status: res.statusCode},
    );
}