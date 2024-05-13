import { createCar } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request: NextResponse, req: any) {
    const session = await getServerSession(req)
    if (!session) {
        return NextResponse.json({
            status: 401,
            statusCode: 401,
            message: 'Unautorized',
        })
    }

    try {
        const formData = await request.formData();

        const mobil = formData.get('mobil') as string;
        const brand = formData.get('brand') as string;
        const model = formData.get('model') as string;
        const jumlah = formData.get('jumlah') as string;
        const tahun = formData.get('tahun') as string;
        const transmisi = formData.get('transmisi') as string;
        const seat = formData.get('seat') as string;
        const hargaLK = formData.get('hargaLK') as string;
        const hargaD = formData.get('hargaD') as string;
        const gambarMobil = formData.get('gambarMobil') as File;

        const dataMobil = {
            mobil,
            brand,
            model,
            jumlah,
            tahun,
            transmisi,
            seat,
            hargaLK,
            hargaD,
            gambarMobil,
        }

        const response = await createCar(dataMobil)

        return NextResponse.json(
            { status: response.status, message: response.message },
            { status: response.statusCode || 200 }
        )
    } catch (error) {
        console.error("Error handling POST request:", error);
        return NextResponse.json({ status: false, message: "Terjadi kesalahan" }, { status: 500 });
    }
}