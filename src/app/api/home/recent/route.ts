import { NextResponse, NextRequest } from "next/server";
import { retrieveData } from "@/lib/firebase/service";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("cars")) || 1;
    const perPage = 3;

    const start = (page - 1) * perPage;
    const end = start + perPage;

    const cars = await retrieveData("cars")
    const totalCars = cars.length;
    const totalPages = Math.ceil(totalCars / perPage)
    
    const paginatedCars = cars.slice(start, end)

    return NextResponse.json({
        status: 200,
        message: "Success",
        data: paginatedCars,
        totalPages,
      });
}